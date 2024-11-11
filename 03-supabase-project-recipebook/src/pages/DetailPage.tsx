// import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useEffect, useState } from "react"
import type { QueryData } from "@supabase/supabase-js"


export default function DetailPage(){
    //         getter       setter
    const [ singleRecipe, setSingleRecipe] = useState<GetSingleRecipeData | null >(null)
    const { id } = useParams<{id: string}>()

    type GetSingleRecipeData = QueryData<ReturnType<typeof getSingleRecipe>>

    // Hier hole ich mir das einzelne Rezept über die ID heraus:
    const getSingleRecipe = async (id: string) =>{
        const result = await supabase
        .from("recipes")
        // "ingredients" ist die neue Tabelle, die hier dazu aufgerufen wird!
        .select(`
            *,
            ingredients(
            name,
            id,
            quantity,
            unit,
            additional_info
            )
            `)
        .eq("id", id)
        .single()
        return result
    }

    useEffect(()=> {
        if(id){
            getSingleRecipe(id).then((result) =>{
            setSingleRecipe(result.data ?? null)
        })}
    }, [id])
    console.log(singleRecipe)

    return(
        <div>
            {/* Wie Bild hier einfügen?! */}
            <h1 className="mb-4 text-4xl">{singleRecipe?.name}</h1>
            <section>
                <p>{singleRecipe?.description_long}</p>
                <p>Zutaten</p>
                <div>{singleRecipe?.ingredients.map((e)=>(
                    <div key={e.id}>
                        <p>{e.name}</p>
                    </div>
                ))}</div>

                <p>Zubereitung</p>
                <div>{singleRecipe?.instructions}</div>
            </section>


        </div>
    )
}