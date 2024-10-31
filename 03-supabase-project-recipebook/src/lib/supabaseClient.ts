import { createClient } from "@supabase/supabase-js";


const supabaseURL = import.meta.env.VITE_supabaseURL
const supabaseKEY = import.meta.env.VITE_supabaseKEY

if(!supabaseURL || !supabaseKEY){
    throw new Error(
        "Please provide either URL or KEY!"
    )
}

export const supabase = createClient(supabaseURL, supabaseKEY)