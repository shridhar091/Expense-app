import { Link, Route,withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PrivateRoute from "../helpers/privateRoute";


import Login from "./login";
import Register from "./register";
import Home from "./home";
import Dashboard from "./dashboard";
import Setting from "./setting";
import Analysis from "./analysis";
import { ToastContainer } from "react-toastify";

const Navbar = (props) => {

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are u sure want logout")
    if(confirmLogout){
      localStorage.removeItem("token");
      props.history.push("/");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Expense App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!localStorage.getItem("token") ? (
              <div >
                <button ><Link to='/'>Home</Link></button>
                <button ><Link to='/register'>Register</Link></button>
                <button ><Link to='/login'>Login</Link></button>
              </div>
            ) : (
              <div >
                <button><Link to='/'>Home</Link></button>
                <button><Link to="/dashboard">Dashboard</Link></button>
                <button><Link to="/setting">Setting</Link></button>
                <button><Link to="/analysis">Analysis</Link></button>
                <button><Link to="/" onClick={handleLogout}>
                  Logout
                </Link></button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <Route path="/" component={Home} exact={true} />
      <Route path="/register" component={Register} exact={true} />
      <Route path="/login" component={Login} exact={true} />
      <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
      <PrivateRoute path="/setting" component={Setting} exact={true} />
      <PrivateRoute path="/analysis" component={Analysis} exact={true} />

      <ToastContainer/>
      
    </div>
  );
};

export default withRouter(Navbar);

