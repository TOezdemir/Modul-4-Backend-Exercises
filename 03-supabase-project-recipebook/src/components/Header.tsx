import { NavLink } from "react-router-dom"
// import { supabase } from "../lib/supabaseClient"
// import { useUserContext } from "../context/userContext"


export default function Header(){
  // const {user, setUser} = useUserContext()
  // const handleLogoutClick = () =>{
  //   setUser(null)
  //   supabase.auth.signOut()
  // }
    return(
        <header>

      <div>
        <NavLink to="/">
          <img src="../img/Icon.png" alt="Logo" /> <h1>Krasse Idee hier ... Name zur Seite</h1>
        </NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/rezepte">Rezepte</NavLink>
          <NavLink to="/ueber-die-seite">Über die Seite!</NavLink>
        </nav>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/neues-rezept-anlegen">Neues Rezept!</NavLink>
        {/* {!user && <NavLink to="/Login">Login</NavLink>}
        {!user && <NavLink to="RecipeCreatePage">Neues Rezept!</NavLink>}
        {user && <button onClick={handleLogoutClick}>Ausloggen</button>} */}
      </div>
      <h3>
        Gucken wir mal, was es hier leckeres gibt...
      </h3>
    </header>
    )
}