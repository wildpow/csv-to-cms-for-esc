import {
  BrowserRouter as Router,
  Switch,
  Link as RouterLink,
  useHistory,
  // useLocation,
  Route,
} from "react-router-dom";
import {
  Box,
  Flex,
  Center,
  Button,
  HStack,
  Container,
  Heading,
  useColorMode,
  Icon,
} from "@chakra-ui/react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import { useAuth } from "./authCTX";
import { ReactComponent as Sun } from "./sun-solid.svg";
import { ReactComponent as Moon } from "./moon-solid.svg";
import { PrivateRoute, AuthButton, AuthMessage } from "./components/auth";
import Admin from "./admin";

export default function App() {
  const { colorMode, toggleColorMode } = useColorMode();
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
            <HStack spacing={4}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <Icon as={Moon} /> : <Icon as={Sun} />}
              </Button>
              <AuthButton />
            </HStack>
          </Flex>
        </Box>
        <Box maxW="1200px" m="0 auto" pt="20px">
          <Center>
            <Switch>
              <Route path="/" component={RootPage} exact />
              <PrivateRoute path="/admin" component={Admin} exact />
              <Route component={RootPage} />
            </Switch>
          </Center>
        </Box>
      </div>
    </Router>
  );
}
// function ErrorPage() {
//   return <h1>Error Page not working</h1>;
// }
function RootPage() {
  let history = useHistory();
  let auth = useAuth();
  let login = () => {
    auth.signin(() => {
      history.push("/admin");
      history.replace("/admin");
    });
  };
  return (
    <Container
      maxW="xl"
      centerContent
      border="1px"
      borderColor="gray.300"
      borderRadius="base"
      boxShadow="md"
      mt="10"
    >
      <Box w="100%" minH="350px" p="2" h="100%">
        <Flex
          pt="10"
          flexDirection="column"
          justifyContent="space-between"
          h="100%"
          minH="250px"
        >
          {auth.user ? (
            <>
              <Heading alignSelf="center" textAlign="center">
                {`Welcome ${auth.user}`}{" "}
              </Heading>
              <ArrowDownIcon alignSelf="center" w="100px" h="100px" />
              <Button
                size="lg"
                variant="solid"
                colorScheme="blue"
                as={RouterLink}
                to="/admin"
              >
                Go to Admin
              </Button>
            </>
          ) : (
            <>
              <Heading alignSelf="center">Please Login.</Heading>
              <ArrowDownIcon alignSelf="center" w="100px" h="100px" />
              <Button
                onClick={login}
                size="lg"
                variant="solid"
                colorScheme="blue"
              >
                Log in
              </Button>
            </>
          )}
        </Flex>
      </Box>
    </Container>
  );
}
// function LoginPage() {
//   let location = useLocation();
//   let history = useHistory();
//   let auth = useAuth();

//   let { from } = location.state || { from: { pathname: "/" } };
//   let login = () => {
//     auth.signin(() => {
//       history.replace(from);
//       history.push(from);
//     });
//   };

//   return (
//     <Container
//       maxW="xl"
//       centerContent
//       border="1px"
//       borderColor="gray.300"
//       borderRadius="base"
//       boxShadow="md"
//       mt="10"
//     >
//       <Box w="100%" minH="350px" p="2" h="100%">
//         <Flex
//           pt="10"
//           flexDirection="column"
//           justifyContent="space-between"
//           h="100%"
//           minH="250px"
//         >
//           <Heading alignSelf="center">Please Login.</Heading>
//           <ArrowDownIcon alignSelf="center" w="100px" h="100px" />
//           <Button onClick={login} size="lg" variant="solid" colorScheme="blue">
//             Log in
//           </Button>
//         </Flex>
//       </Box>
//     </Container>
//   );
// }
