import { NavLink } from "react-router-dom"
import { supabase } from "../lib/supabaseClient"
import { useUserContext } from "../context/userContext"


export default function Header(){
  const {user, setUser} = useUserContext()
  const handleLogoutClick = () =>{
    setUser(null)
    supabase.auth.signOut()
  }
    return(
      <header>
        <div className="bg-yellow-400 h-8 "></div>
          <div className="container mx-auto py-14 px-60 flex items-center justify-between">
            <NavLink to="/" className="flex items-center">
              <img src="../img/Icon.png" alt="Logo" className="h-8 mr-2" /> 
              <span className="font-bold text-xl">WG Rezepte</span>
            </NavLink>
            <nav className="space-x-6">
            <NavLink to="/" className="hover:text-gray-600">Home</NavLink>
            <NavLink to="/rezepte" className="hover:text-gray-600">Rezepte</NavLink>
            <NavLink to="/ueber-die-seite" className="hover:text-gray-600">Über die Seite!</NavLink>
            {!user && <NavLink to="/Login" className="hover:text-gray-600">Login</NavLink>}
            {user && <NavLink to="/neues-rezept-anlegen" className="hover:text-gray-600">Neues Rezept!</NavLink>}
            {user && <button onClick={handleLogoutClick} className="container mx-auto text-center mt-2">Ausloggen</button>}
            </nav>
          </div>
    </header>
    )
}