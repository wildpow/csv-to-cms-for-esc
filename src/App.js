import {
  useColorMode,
  Button,
  Heading,
  Text,
  Box,
  Container,
} from "@chakra-ui/react";
function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Container>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={10}
      >
        <header>
          <Heading>CSV to CMS for ESC</Heading>
        </header>
        <Text>
          Download CSV copy of product data from CMS and upload changes back to
          CMS
        </Text>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </Box>
    </Container>
  );
}

export default App;
