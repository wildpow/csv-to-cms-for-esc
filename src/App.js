import {
  BrowserRouter as Router,
  Switch,
  Link,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useAuth } from "./authCTX";
import { PrivateRoute, AuthButton } from "./components/auth";

export default function App() {
  return (
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>

        <Switch>
          <PrivateRoute path="/" component={PublicPage} exact />
          <PrivateRoute loggedIn path="/login" component={LoginPage} exact />
        </Switch>
      </div>
    </Router>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace("/");
      // history.push("/");
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
