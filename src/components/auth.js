import { Route, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../authCTX";
export const AuthButton = () => {
  let history = useHistory();
  let auth = useAuth();

  return auth.user ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          auth.signout(() => history.push("/login"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

export const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  let auth = useAuth();
  if (loggedIn) {
    return (
      <>
        {!auth.isLoading && (
          <Route
            {...rest}
            render={(props) =>
              auth.user ? <Redirect to="/" /> : <Component {...props} />
            }
          />
        )}
      </>
    );
  } else {
    return (
      <>
        {!auth.isLoading && (
          <Route
            {...rest}
            render={(props) =>
              auth.user ? <Component {...props} /> : <Redirect to="/login" />
            }
          />
        )}
      </>
    );
  }
};
