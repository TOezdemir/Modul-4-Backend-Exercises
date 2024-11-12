import { useState } from "react";
import { produce } from "immer";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import { supabase } from "../lib/supabaseClient";

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
  const [recipe, setRecipe] = useState({
    name: "",
    description_long: "",
    servings: Number("Portionen"),
    instructions: "",
  });

  const navigate  = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //Category_Id ... wie stelle ich ein ob Frühstück, Mittag, Abendessen oder Dessert? ... 
    const recipeResult = await supabase
      .from("recipes")
      .insert({
        ...recipe,
        description_short: "",
        category_id: "9dac3077-02b6-4769-80ed-2420ef73b04f"
      })
      .select("id")
      .single();

    if (recipeResult.error) {
      alert("Fehler!");
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
    // navigate to homepage if recipe insertion was successfull
    navigate(`/rezepte/${slugify(recipe.name, {lower: true})}/${newRecipeId}`)
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
          setRecipe((prev) => ({ ...prev, description: e.target.value }))
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