import { createBrowserRouter } from "react-router-dom";
import Inicio from "../pages/inicio";
import Product from "../pages/producto/index";
import Descuentos from "../pages/descuentos";

export const router = createBrowserRouter([
  {
    children: [
      {
        Component: Inicio,
        path: "/",
      },
      {
        Component: Product,
        path: "producto",
      },
      {
        Component: Descuentos,
        path: "descuentos",
      },
    ],
  },
]);
