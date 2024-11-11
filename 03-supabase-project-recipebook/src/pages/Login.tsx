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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                 <input 
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                 />
                <button>Einloggen</button>
            </form>
        </div>
    )
}