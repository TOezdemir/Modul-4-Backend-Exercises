import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import type { QueryData } from "@supabase/supabase-js";

const getFeaturedRecipes = async () => {
  const result = await supabase
    .from("recipes")
    .select("id, description, name, image_url")
    .limit(3);
  return result
};

type GetFeaturedRecipesData = QueryData<ReturnType<typeof getFeaturedRecipes>>

export default function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<GetFeaturedRecipesData>([])

  useEffect(() => {
    getFeaturedRecipes().then((result) => {
      setRecipes(result.data ?? []);
    });
  }, []);

  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">
        Ausgewählte Rezepte:
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* HIER SPÄTER EINEN RANDOMIZER REIN*/}
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* && fragt nur nach Wahrheit ab - benötigt keinen "else" */}
            {recipe.image_url && 
            <img
              src={recipe.image_url}
              alt={recipe.name}
              className="w-full h-48 object-cover"
            />}
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.description}</p>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4">
                Zum Rezept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}