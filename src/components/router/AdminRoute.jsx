import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const AdminRoute = ({ element, isAdmin }) => {
  return isAdmin ? element : <Navigate to="/" />;
};
AdminRoute.propTypes = {
  element: PropTypes.element.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
export default AdminRoute;
