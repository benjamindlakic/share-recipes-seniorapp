import { supabase } from "@/lib/supabase";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useRecipeList = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      // Fetch recipes ordered by creation date (most recent first)
      const { data: recipes, error: recipesError } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (recipesError) {
        throw new Error(recipesError.message);
      }

      // Extract unique user IDs
      const userIds = [...new Set(recipes.map((recipe) => recipe.userID))];

      // Fetch user details for each unique userID
      const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      if (usersError) {
        throw new Error(usersError.message);
      }

      // Create a map of userID to full_name
      const userMap: Record<string, string> = users.reduce((acc, user) => {
        acc[user.id] = user.full_name;
        return acc;
      }, {} as Record<string, string>);

      // Add full_name to each recipe
      const recipesWithUserNames = recipes.map((recipe) => ({
        ...recipe,
        full_name: userMap[recipe.userID],
      }));

      return recipesWithUserNames;
    },
  });
};

export const useRecipe = (recipeId: number, userId: string) => {
  return useQuery({
    queryKey: ["recipe", recipeId],
    queryFn: async () => {
      // Fetch the recipe by ID
      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", recipeId)
        .single();

      if (recipeError) {
        throw new Error(recipeError.message);
      }

      // Fetch the user details
      const { data: user, error: userError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .eq("id", recipe.userID)
        .single();

      if (userError) {
        throw new Error(userError.message);
      }

      // Check if the current user has liked the recipe
      const { data: like, error: likeError } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", userId)
        .eq("recipe_id", recipeId)
        .single();

      const recipeWithUserName = {
        ...recipe,
        full_name: user.full_name,
        likedByCurrentUser: !!like,
      };

      return recipeWithUserName;
    },
  });
};

interface LikeRecipeParams {
  user_id: string;
  recipe_id: number;
  liked: boolean;
}

export const useLikeRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ user_id, recipe_id, liked }: LikeRecipeParams) => {
      try {
        if (liked) {
          // Unlike the recipe
          await supabase
            .from('likes')
            .delete()
            .eq('user_id', user_id)
            .eq('recipe_id', recipe_id);
        } else {
          // Like the recipe
          await supabase.from('likes').insert({
            user_id,
            recipe_id,
            liked: true,
          });
        }

        // Fetch updated likes count from recipes table
        const { data: recipeData, error: recipeError } = await supabase
          .from('recipes')
          .select('likes')
          .eq('id', recipe_id)
          .single();

        if (recipeError) {
          throw new Error(recipeError.message);
        }

        const currentLikes = recipeData.likes || 0;
        const newLikes = liked ? currentLikes - 1 : currentLikes + 1;

        // Update likes count in recipes table
        await supabase
          .from('recipes')
          .update({ likes: newLikes })
          .eq('id', recipe_id);

        // Invalidate the recipe query to refetch updated data
        queryClient.invalidateQueries({queryKey:['recipe', recipe_id]});
      } catch (error) {
        console.error('Error liking/unliking recipe:', error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["recipes"]});
    },
  });
};

export const useInsertRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newRecipe } = await supabase
        .from("recipes")
        .insert({
          title: data.title,
          userID: data.userID,
          description: data.description,
          image: data.image,
          ingredients: data.ingredients,
          instructions: data.instructions,
          difficulty: data.difficulty,
          cookingTime: data.cookingTime,
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newRecipe;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["recipes"]});
    },
  });
};


// FOLLOW

interface FollowUserParams {
  follower_id: string; // Current user ID
  following_id: string; // Recipe creator user ID
  followed: boolean;
}

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ follower_id, following_id, followed }: FollowUserParams) => {
      try {
        if (followed) {

          const { error: deleteError } = await supabase
            .from('follows')
            .delete()
            .eq('follower_id', follower_id)
            .eq('following_id', following_id);

          if (deleteError) {
            console.error('Error deleting follow:', deleteError);
            throw deleteError;
          }

          const { error: decrementFollowingError } = await supabase.rpc('decrement_following_count', { user_id: follower_id });
          if (decrementFollowingError) {
            throw decrementFollowingError;
          }

          const { error: decrementFollowersError } = await supabase.rpc('decrement_followers_count', { user_id: following_id });
          if (decrementFollowersError) {
            console.error('Error decrementing followers count:', decrementFollowersError);
            throw decrementFollowersError;
          }

        } else {

          const { error: insertError } = await supabase.from('follows').insert({
            follower_id,
            following_id,
          });

          if (insertError) {
            console.error('Error inserting follow:', insertError);
            throw insertError;
          }

          const { error: incrementFollowingError } = await supabase.rpc('increment_following_count', { user_id: follower_id });
          if (incrementFollowingError) {
            throw incrementFollowingError;
          }

          const { data: currentFollowers, error: currentFollowersError } = await supabase
            .from('profiles')
            .select('followers')
            .eq('id', following_id)
            .single();


          const { data: incrementFollowersData, error: incrementFollowersError } = await supabase.rpc('increment_followers_count', { user_id: following_id });


          if (incrementFollowersError) {
            console.error('Error incrementing followers count:', incrementFollowersError);
            throw incrementFollowersError;
          }

          const { data: newFollowers, error: newFollowersError } = await supabase
            .from('profiles')
            .select('followers')
            .eq('id', following_id)
            .single();

        }

        queryClient.invalidateQueries({ queryKey: ['profile', following_id] });
        queryClient.invalidateQueries({ queryKey: ['profile', follower_id] });
      } catch (error) {
        console.error('Error following/unfollowing user:', error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["profiles"]});
    },
  });
};

export const useSearchRecipes = (
  query: string,
  minCalories: number,
  maxCalories: number,
  minCookingTime: number,
  maxCookingTime: number,
  difficulty: string
) => {
  return useQuery({
    queryKey: ["searchRecipes", query, minCalories, maxCalories, minCookingTime, maxCookingTime, difficulty],
    queryFn: async () => {
      let baseQuery = supabase
        .from("recipes")
        .select("*")
        .ilike("title", `%${query}%`);

      // Apply additional filters
      if (minCalories !== undefined && maxCalories !== undefined) {
        baseQuery = baseQuery.gte("calories", minCalories).lte("calories", maxCalories);
      }
      if (minCookingTime !== undefined && maxCookingTime !== undefined) {
        baseQuery = baseQuery.gte("cookingTime", minCookingTime).lte("cookingTime", maxCookingTime);
      }
      if (difficulty) {
        baseQuery = baseQuery.eq("difficulty", difficulty);
      }

      const { data: recipes, error: recipesError } = await baseQuery;
      if (recipesError) {
        throw new Error(recipesError.message);
      }

      // Fetch user details
      const userIds = [...new Set(recipes.map((recipe) => recipe.userID))];
      const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);
      if (usersError) {
        throw new Error(usersError.message);
      }

      const userMap: Record<string, string> = users.reduce((acc, user) => {
        acc[user.id] = user.full_name;
        return acc;
      }, {} as Record<string, string>);

      const recipesWithUserNames = recipes.map((recipe) => ({
        ...recipe,
        full_name: userMap[recipe.userID],
      }));

      return recipesWithUserNames;
    },
  });
};
export const useTopProfiles = (user_id: String) => {
  return useQuery({
    queryKey: ["topProfiles", user_id],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("id, full_name, followers")
        .order("followers", { ascending: false })
        .limit(6);

      if (profilesError) {
        throw new Error(profilesError.message);
      }

      const profileIds = profiles.map(profile => profile.id);

      const { data: follows, error: followsError } = await supabase
        .from("follows")
        .select("following_id, follower_id")
        .in("following_id", profileIds)
        .eq("follower_id", user_id);

      if (followsError) {
        throw new Error(followsError.message);
      }

      return { profiles, follows };
    },
  });
};

export const useTopLikedRecipes = () => {
  return useQuery({
    queryKey: ["topLikedRecipes"],
    queryFn: async () => {
      const { data: recipes, error: recipesError } = await supabase
        .from("recipes")
        .select("*")
        .order("likes", { ascending: false })
        .limit(6);

      if (recipesError) {
        throw new Error(recipesError.message);
      }

      const userIds = [...new Set(recipes.map((recipe) => recipe.userID))];

      const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      if (usersError) {
        throw new Error(usersError.message);
      }

      const userMap: Record<string, string> = users.reduce((acc, user) => {
        acc[user.id] = user.full_name;
        return acc;
      }, {} as Record<string, string>);

      const recipesWithUserNames = recipes.map((recipe) => ({
        ...recipe,
        full_name: userMap[recipe.userID],
      }));

      return recipesWithUserNames;
    },
  });
};

export const useLowestCalorieRecipes = () => {
  return useQuery({
    queryKey: ["lowestCalorieRecipes"],
    queryFn: async () => {
      const { data: recipes, error: recipesError } = await supabase
        .from("recipes")
        .select("*")
        .order("calories", { ascending: true })
        .limit(6);

      if (recipesError) {
        throw new Error(recipesError.message);
      }

      const userIds = [...new Set(recipes.map((recipe) => recipe.userID))];

      const { data: users, error: usersError } = await supabase
        .from("profiles")
        .select("id, full_name")
        .in("id", userIds);

      if (usersError) {
        throw new Error(usersError.message);
      }

      const userMap: Record<string, string> = users.reduce((acc, user) => {
        acc[user.id] = user.full_name;
        return acc;
      }, {} as Record<string, string>);

      const recipesWithUserNames = recipes.map((recipe) => ({
        ...recipe,
        full_name: userMap[recipe.userID],
      }));

      return recipesWithUserNames;
    },
  });
};