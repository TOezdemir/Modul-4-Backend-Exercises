import { useEffect, useRef, useState } from "react";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { supabase } from "../lib/supabaseClient";
import { QueryData } from "@supabase/supabase-js";
import { useUserContext } from "../context/userContext";

type Ingredient = {
  name: string;
  unit: string;
  quantity: number;
  additionalInfo: string;
};

const emptyIngredient: Ingredient = {
  name: "",
  unit: "",
  quantity: 0,
  additionalInfo: "",
};

export default function RecipeCreatePage() {
  const { user } = useUserContext()
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [recipePath, setRecipePath] = useState<string | undefined>("")
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<CategoryData>([])
  const [recipe, setRecipe] = useState({
    name: "",
    description_long: "",
    servings: 2,
    instructions: "",
    category_id: ""
  });

  type CategoryData = QueryData<ReturnType<typeof getAllCategories>>

  const getAllCategories = async () =>{
    const result = await supabase.from("categories").select("*")
    console.log(result.data)
    return result
  }

  useEffect(()=>{
    getAllCategories().then((result)=> setCategories(result.data || []))
  }, [])

  const navigate  = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imagePath: string | null = null

    if(!user) {return}
    const file = fileInputRef.current?.files?.[0] || null

    if(file){
      const uploadResult = await supabase.storage
        .from("recipe_image")
        .upload(`${user?.id}/${crypto.randomUUID()}`, file, {upsert: true})
      imagePath = uploadResult.data?.fullPath || null
    }

    const recipeResult = await supabase
      .from("recipes")
      .insert({
        ...recipe,
        description_long: "",
        description_short: "",
        image_url: imagePath
      })
      .select("id")
      .single();

    if (recipeResult.error) {
      alert("Fehler!")
      console.error(recipeResult.error);
      return;
    }

    const newRecipeId = recipeResult.data.id;

    const ingredientsResult = await supabase.from("ingredients").insert(
      ingredients.map((element) => ({
        name: element.name,
        additional_info: element.additionalInfo,
        unit: element.unit,
        quantity: 0,
        recipe_id: newRecipeId
      }))
    );

    if (ingredientsResult.error) {
      alert("Sorry, keine Zutaten für dich!");
      return;
    }
    navigate(`/rezept/${slugify(recipe.name, {lower: true})}/${newRecipeId}`)
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, emptyIngredient]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Neues Rezept</h1>
      <button>Einreichen</button>
      <br />
      <br />
      <input
        type="text"
        value={recipe.name}
        required
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="Name des Gerichts"
      />
      <br />
      <input
        type="text"
        value={recipe.description_long}
        required
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, description_long: e.target.value }))
        }
        placeholder="Beschreibung"
      />
      <br />
      <input
        type="text"
        value={recipe.instructions}
        required
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, instructions: e.target.value }))
        }
        placeholder="Zubereitung"
      />
      <br />
      <input
        type="number"
        value={recipe.servings}
        required
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
        }
        placeholder="Portionen"
      />
      <br />
      <input
      name="image"
      type="file"
      accept="image/*"
      placeholder="Bild URL"
      ref={fileInputRef}
      />
      <br />
      <select 
        value={recipe.category_id}
        required
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, category_id: e.target.value }))
        } 
        name="" id="">
          <option value="">Wähle aus</option>
         {categories.map((e)=>(
          <option key={e.id} value={e.id}>{e.name}</option>
         ))}
      </select>
      <br />
      <div>
        <h3>Zutaten</h3>
        <button type="button" onClick={addIngredient}>
          Zutat hinzufügen
        </button>
        <div>
          {ingredients.map((ingredient, index) => {
            return (
              <div key={index}>
                <input
                  type="text"
                  value={ingredient.name}
                  required
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].name = e.target.value
                  })))
                  }
                  placeholder="Zutat"
                />
                <input
                  type="text"
                  value={ingredient.unit}
                  required
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].unit = e.target.value
                  })))
                  }
                  placeholder="Einheit"
                />
                <input
                  type="number"
                  value={ingredient.quantity}
                  required
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].quantity = Number(e.target.value)
                  })))
                  }
                  placeholder="Menge"
                />
                <input
                  type="text"
                  value={ingredient.additionalInfo}
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].additionalInfo = e.target.value
                  })))
                  }
                  placeholder="Zusätzliche Information"
                />
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}