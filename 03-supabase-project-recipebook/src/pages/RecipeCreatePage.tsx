import { useState } from "react"
import { supabase } from "../lib/supabaseClient"

type Ingredient = {
    name: string,
    unit: string,
    quantity: string,
    additionalInfo: string
}

const emptyIngredientObject: Ingredient = {
    name: "",
    unit: "",
    quantity: "",
    additionalInfo: ""

}

export default function RecipeCreatePage(){
    const [recipe, setRecipe] = useState({
        name: "",
        description: "",
        servings: 1,
        instructions: "",
        category_id: "",
    })

    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    const handleAddIngredientClick = () =>{
        setIngredients((oldIngredients) =>[...oldIngredients, emptyIngredientObject])
    }

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault()

        const recipeResult = await supabase
            .from("recipes")
            .insert({
                ...recipe,
                category_id: ""
            })
            .select("id")
            .single()
        
        if(recipeResult.error){
            alert("Something went wrong!")
            return
        }

        const newRecipeId = recipeResult.data?.id
        
        const ingredientsResult = await supabase.from("ingredients").insert(
            ingredients.map((element)=>({
                name: element.name,
                additional_info: element.additionalInfo,
                unit: element.unit,
                quantity: 0,
                recipe_id: newRecipeId,
            }))
        )

        if(ingredientsResult.error){
            alert("Sorry, no Ingredients found!")
            return
        }
    }


    return(
        <>
        <h1>Rezept hinzufügen:</h1>
        <button onClick={handleSubmit}>Submit</button>
        {/* <input type="text" name="" id="" value={recipe.name} onChange={(e)=>{setRecipe({...recipe, name: e.target.value})}}/> */}
        <input type="text" name="" id="" value={recipe.name} onChange={(e)=>{setRecipe((old)=>({...old, name: e.target.value}))}}/>
        <br />
        <input type="text" name="" id="" value={recipe.description} onChange={(e)=>{setRecipe((old)=>({...old, description: e.target.value}))}}/>
        <br />
        <input type="text" name="" id="" value={recipe.servings} onChange={(e)=>{setRecipe((old)=>({...old, servings: Number(e.target.value)}))}}/>
        <br />
        <input type="text" name="" id="" value={recipe.instructions} onChange={(e)=>{setRecipe((old)=>({...old, instructions: e.target.value}))}}/>
        <br />
        <input type="text" name="" id="" value={recipe.category_id} onChange={(e)=>{setRecipe((old)=>({...old, category_id: e.target.value}))}}/>
        <br />
        <button onClick={handleAddIngredientClick}>Zutaten hinzufügen:</button>
        <br />
        <br />
        <div>
            {ingredients.map((ingredient, index)=>{
            return(
                <div key={index}>
                    <input type="text" placeholder="Name" value={ingredient.name} onChange={(e)=>{
                        setIngredients((oldIngredients)=>{
                            const currentIngredient = oldIngredients[index]
                            const newIngredient = {...currentIngredient, name: e.target.value}
                            const prev = oldIngredients.slice(0, index)
                            const after = oldIngredients.slice(index + 1)
                            const newIngredients = {...prev, newIngredient, ...after, name: e.target.value}
                            return newIngredients
                        })}}/>
                    <input type="text" placeholder="Einheit" value={ingredient.unit} />
                    <input type="number" placeholder="Quantity" value={ingredient.quantity}/>
                    <input type="text" placeholder="additional_info" value={ingredient.additionalInfo}/>
                </div>
            )
            })}
        </div>
        </>
    )
}