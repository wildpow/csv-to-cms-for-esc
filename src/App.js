import {
  BrowserRouter as Router,
  Switch,
  Link as RouterLink,
  useHistory,
  useLocation,
  Route,
} from "react-router-dom";
import {
  Box,
  Flex,
  Center,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import { useAuth } from "./authCTX";
import { PrivateRoute, AuthButton, AuthMessage } from "./components/auth";
import Admin from "./admin";

export default function App() {
  return (
    <Router>
      <div>
        <Box
          as="nav"
          w="100%"
          bg="blue.800"
          pt="10px"
          pb="10px"
          boxShadow="base"
        >
          <Flex
            maxW="1200px"
            justifyContent="space-between"
            m="0 auto"
            alignItems="center"
          >
            <Button
              as={RouterLink}
              to="/"
              color="white"
              variant="ghost"
              _hover={{ color: "gray.900", bg: "white" }}
            >
              <h1>CSV to CMS</h1>
            </Button>
            <AuthMessage />
            <AuthButton />
          </Flex>
        </Box>
        <Box maxW="1200px" m="0 auto" pt="20px">
          <Center border="1px" borderRadius="base" boxShadow="base">
            <Switch>
              <PrivateRoute path="/" component={Admin} exact />
              <PrivateRoute loggedIn path="/login" component={LoginPage} />
              <Route component={ErrorPage} />
            </Switch>
          </Center>
        </Box>
      </div>
    </Router>
  );
}
function ErrorPage() {
  return <h1>Error Page not working</h1>;
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
      history.push(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}
