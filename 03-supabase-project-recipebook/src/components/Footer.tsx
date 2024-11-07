import { NavLink } from "react-router-dom"

export default function Footer(){
    return(
        <footer>

        <NavLink to="/">
          <img src="../img/Icon.png" alt="Logo" /> <h1>Krasse Idee hier.</h1>
        </NavLink>

        <nav className="social_media">
          {/* Bildpfade klären! public dir! */}
          <a href="">
            <img src="../img/pages.png" alt="Instagram" />
          </a>
          <a href="">
            <img src="../img/youtube.png" alt="YouTube" />
          </a>
          <a href="">
            <img src="../img/threads.png" alt="Meta Threads" />
          </a>
          <a href="../img/pinterest.png">
            <img src="" alt="pinterest" />
          </a>
        </nav>

        <NavLink to="/Login">Login</NavLink>
        
      </footer>
    )
}