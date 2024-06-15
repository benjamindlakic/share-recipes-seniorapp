import { supabase } from "@/lib/supabase";
import { useQuery, useMutation } from "@tanstack/react-query";

export const useRecipeList = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("recipes").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useRecipe = (id: number) => {
  return useQuery({
    queryKey: ["recipes", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useInsertRecipe = () => {
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newRecipe } = await supabase.from("recipes").insert({
        title: data.title,
        userID: data.userID,
        description: data.description,
        image: data.image,
        ingredients: data.ingredients,
        instructions: data.instructions,
        difficulty: data.difficulty,
        cookingTime: data.cookingTime,
      }).single();
      if (error) {
        throw new Error(error.message);
      }
      return newRecipe;
    },
  });
};
