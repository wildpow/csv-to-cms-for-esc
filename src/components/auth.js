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
          auth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
};

export const PrivateRoute = ({ children, ...rest }) => {
  let auth = useAuth();
  return (
    <>
      {!auth.isLoading && (
        <Route
          {...rest}
          render={({ location }) =>
            auth.user ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: location },
                }}
              />
            )
          }
        />
      )}
    </>
  );
};
