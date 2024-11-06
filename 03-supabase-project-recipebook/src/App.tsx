// import FeaturedRecipes from "./components/FeaturedRecipes"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Recipes from "./pages/Recipes"
import Home from "./pages/Home"
import DetailPage from "./pages/DetailPage"
import Layout from "./components/Layout"
import AboutMe from "./pages/AboutMe"
import Login from "./pages/Login"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/rezepte",
        element: <Recipes />,
      },
      {
        path: "/recipes/:id",
        element: <DetailPage />,
      },
      // {
      //   path: "/ausgewaehlte-rezepte",
      //   element: <FeaturedRecipes />,
      // },
      {
        path: "/ueber-mich",
        element: <AboutMe />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
