import { useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { useUserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { setUser } = useUserContext();
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const result = await supabase.auth.signInWithPassword({email, password})
        if(result.error){
            alert(result.error.message)
        } else {
            setUser(result.data.user)
            navigate("/")
        }
    }

    return(
        <div className="flex flex-col items-center px-4">
            <h1 className="text-xl md:text-2xl my-10">Login</h1>
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            >
                <input 
                type="text"
                placeholder="Email Adresse"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow w-64"
                required
                />
                 <input 
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow w-64"
                required
                 />
                <button
                className="text-lg flex items-center justify-center mt-5 bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded w-64"
                >Einloggen
                </button>
            </form>
        </div>
    )
}