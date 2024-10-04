import * as ROUTE from "@/constants/routes";
import { NavLink } from "react-router-dom";
import { Router } from "../../routers/index";

const Header = () => {
  return (
    <nav>
      <ul className="navigation-menu-main">
        <li>
          <NavLink
            activeClassName="navigation-menu-active"
            exact
            to={Router.Inicio}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navigation-menu-active" 
          to={ROUTE.SHOP}>
            Producto
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="navigation-menu-active" to={ROUTE.SHOP}>
            Descuentos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
