import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx";
import AboutUS from "./components/Pages/AboutUs.jsx";
import MakeupStudio from "./components/Pages/MakeupStudio.jsx";
import Contact from "./components/Pages/Contact.jsx";
import Academy from "./components/Pages/Academy.jsx";
import Community from "./components/Pages/Community.jsx";
import MakeUpProducts from "./components/Pages/MakeupProducts.jsx";
import Home from "./components/Pages/Home.jsx";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about-us",
        element: <AboutUS />,
      },
      {
        path: "makeup-studio",
        element: <MakeupStudio />,
      },
      {
        path: "contact-us",
        element: <Contact />,
      },
      {
        path: "academy",
        element: <Academy />,
      },
      {
        path: "community",
        element: <Community />,
      },
      {
        path: "makeup-products",
        element: <MakeUpProducts />,
      },
    ],
  },
]);

export default router;
