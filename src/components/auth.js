import { Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";
import { useAuth } from "../authCTX";

export const AuthButton = () => {
  let history = useHistory();
  let auth = useAuth();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
      history.push(from);
    });
  };
  return auth.user ? (
    <Button
      color="white"
      _hover={{ color: "gray.900", bg: "white" }}
      variant="outline"
      onClick={() => {
        auth.signout(() => history.push("/"));
      }}
    >
      Sign out
    </Button>
  ) : (
    <Button onClick={login}>Log in</Button>
  );
};

export const AuthMessage = () => {
  let auth = useAuth();
  return (
    <Text color="white">
      {auth.user ? auth.user : "You are not logged in."}
    </Text>
  );
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useAuth();
  if (!auth.isLoading) {
    return (
      <>
        <Route
          {...rest}
          render={(props) =>
            auth.user ? <Component {...props} /> : <Redirect to="/" />
          }
        />
      </>
    );
  } else {
    return <div>loading</div>;
  }
};
