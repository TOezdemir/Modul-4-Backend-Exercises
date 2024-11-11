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
    servings: 2,
    instructions: "",
  });

  const navigate  = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      alert("Something went wrong");
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
      alert("Sorry, no Ingredients for you!");
      return;
    }
    // navigate to homepage if recipe insertion was successfull
    navigate(`/recipes/${slugify(recipe.name, {lower: true})}/${newRecipeId}`)
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, emptyIngredient]);
  };
  console.log(ingredients);

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Recipe</h1>
      <button>Submit</button>
      <br />
      <br />
      <input
        type="text"
        value={recipe.name}
        required
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, name: e.target.value }))
        }
        placeholder="name"
      />
      <br />
      <input
        type="text"
        value={recipe.description_long}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, description: e.target.value }))
        }
        placeholder="description"
      />
      <br />
      <input
        type="text"
        value={recipe.instructions}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, instructions: e.target.value }))
        }
        placeholder="instructions"
      />
      <br />
      <input
        type="number"
        value={recipe.servings}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, servings: Number(e.target.value) }))
        }
        placeholder="servings"
      />
      <br />
      <div>
        <h3>Ingredients</h3>
        <button type="button" onClick={addIngredient}>
          Add Ingredient
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
                  placeholder="name"
                />
                <input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].unit = e.target.value
                  })))
                  }
                  placeholder="unit"
                />
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].quantity = Number(e.target.value)
                  })))
                  }
                  placeholder="quantity"
                />
                <input
                  type="text"
                  value={ingredient.additionalInfo}
                  onChange={(e) => setIngredients((oldIngredients)=>(produce(oldIngredients, (ingredientsDraft)=>{
                    ingredientsDraft[index].additionalInfo = e.target.value
                  })))
                  }
                  placeholder="additionalInfo"
                />
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
}