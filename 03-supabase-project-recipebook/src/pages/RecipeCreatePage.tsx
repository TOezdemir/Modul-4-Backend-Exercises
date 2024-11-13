import { useEffect, useState } from "react";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { supabase } from "../lib/supabaseClient";
import { QueryData } from "@supabase/supabase-js";

//  To DO
// 1. Alle Kategorien fetchen
// 2. HTML Select Feld bauen mit gefetchten Daten
// 3. Ausgewählte Kategorie ID in einem State speichern 
// 4. State schreiben, State mit Insert verbinden!

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
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [categories, setCategories] = useState<CategoryData>([])
  const [recipe, setRecipe] = useState({
    name: "",
    description_long: "",
    servings: 2,
    instructions: "",
    category_id: ""
  });

  console.log(recipe)

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

    //Category_Id ... wie stelle ich ein ob Frühstück, Mittag, Abendessen oder Dessert? ... 
    const recipeResult = await supabase
      .from("recipes")
      .insert({
        ...recipe,
        description_long: "",
        description_short: ""
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
        recipe_id: newRecipeId,
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
  console.log(ingredients);

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
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, description_long: e.target.value }))
        }
        placeholder="Beschreibung"
      />
      <br />
      <input
        type="text"
        value={recipe.instructions}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, instructions: e.target.value }))
        }
        placeholder="Zubereitung"
      />
      <br />
      <input
        type="number"
        value={recipe.servings}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
        }
        placeholder="Portionen"
      />
      <br />
      <select 
        value={recipe.category_id}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, category_id: e.target.value }))
        } 
        name="" id="">
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
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].name = e.target.value
                  })))
                  }
                  placeholder="Zutat"
                />
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].unit = e.target.value
                  })))
                  }
                  placeholder="Einheit"
                />
                <input
                  type="number"
                  value={ingredient.quantity}
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