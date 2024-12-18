import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";


const supabaseURL = import.meta.env.VITE_supabaseURL
const supabaseKEY = import.meta.env.VITE_supabaseKEY

if(!supabaseURL || !supabaseKEY){
    throw new Error(
        "Please provide either URL or KEY!"
    )
}

export const supabase = createClient<Database>(supabaseURL, supabaseKEY)

export function getStorageURL(path: string | null){
    if(path === null) return null
    const URL = supabaseURL + "/storage/v1/object/public/" + path
    return URL
}