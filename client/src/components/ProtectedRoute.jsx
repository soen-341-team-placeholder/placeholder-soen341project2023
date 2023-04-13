import * as fn from "./Function";

/**
 * Component that protects routes by checking if the user is logged in.
 * @param {Object} props - The props object for the component.
 * @param {Object} props.children - The child elements of the component.
 * @returns {JSX.Element} - The child elements or the login redirector.
 */
export default function ProtectedRoute({ children }) {
  if (fn.isLoggedIn()) {
    return children;
  } else {
    console.log('used protection!');
    return fn.loginRedirector();
  }
}