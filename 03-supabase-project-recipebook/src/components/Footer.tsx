import { NavLink } from "react-router-dom"
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <footer className="bg-yellow-400 py-8">
      <div className="container mx-auto flex justify-between items-center">

        <NavLink to="/" className="flex items-center">
          <img src="../img/Icon.png" alt="Logo" className="h-8 mr-2" />
          <span className="font-bold text-xl">WG Rezepte</span>
        </NavLink>

        <div className="flex flex-col">
          <span className="font-bold text-gray-800 mb-4">Social Media</span>
          <nav className="flex space-x-6">
            <a href="https://www.instagram.com/" target="_blank">
              <SocialIcon url="https://www.instagram.com/" aria-label="Instagram" className="h-6" />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <SocialIcon url="https://www.youtube.com/" aria-label="YouTube" className="h-6" />
            </a>
            <a href="https://www.threads.net/?hl=de" target="_blank">
              <SocialIcon url="https://www.threads.net/?hl=de" aria-label="Meta Threads" className="h-6" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}