import { NavLink } from "react-router-dom"

export default function Header(){
    return(
        <header>

      <div>
        <NavLink to="/">
          <img src="../img/Icon.png" alt="Logo" /> <h1>Krasse Idee hier ... Name zur Seite</h1>
        </NavLink>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/rezepte">Rezepte</NavLink>
          <NavLink to="/ueber-mich">Über mich!</NavLink>
        </nav>
        <NavLink to="/Login">Login</NavLink>
      </div>
      <h3>
        Gucken wir mal, was es hier leckeres gibt...
      </h3>
    </header>
    )
}