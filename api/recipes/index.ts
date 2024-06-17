import { supabase } from "@/lib/supabase";
import { useAuth } from "@/providers/AuthProvider";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useRecipeList = () => {
  const { session } = useAuth();

  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      // Fetch recipes
      const { data: recipes, error: recipesError } = await supabase
        .from("recipes")
        .select("*");
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

export const useRecipe = (recipeId: number) => {
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

      // Add full_name to the recipe
      const recipeWithUserName = {
        ...recipe,
        full_name: user.full_name,
      };

      return recipeWithUserName;
    },
  });
};

export const useInsertRecipe = () => {
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
  });
};
