import { Route, Redirect, useHistory, useLocation } from "react-router-dom";
import { Box, Flex, Link, Center, Button, Text } from "@chakra-ui/react";
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
        auth.signout(() => history.push("/login"));
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
      {auth.user ? `Welcome ${auth.user}` : "You are not logged in."}
    </Text>
  );
};
export const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => {
  let auth = useAuth();
  if (loggedIn) {
    return (
      <>
        {auth.isLoading === false && (
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
