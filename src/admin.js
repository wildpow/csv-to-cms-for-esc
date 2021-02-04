import { useState } from "react";
import {
  Box,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Container,
  Spinner,
  useToast,
  Flex,
  Stack,
} from "@chakra-ui/react";
import GetProducts from "./getProducts";
import { RepeatIcon } from "@chakra-ui/icons";
import { SiteClient } from "datocms-client";
import FileUploader from "./components/fileUploader";
// import PapaParse from "papaparse";
const client = new SiteClient(process.env.REACT_APP_DATO);

export default function Admin() {
  const toast = useToast();
  const [newProducts, setNewProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateProducts = () => {
    setLoading(true);
    Promise.all(newProducts.map((p) => apiCall(p))).then(() => {
      toast({
        title: "Products Updated",
        description:
          "Updating products is complete. You can trigger a build now if you would like.",
        status: "success",
        duration: 6000,
        isClosable: true,
      });
      setNewProducts(null);
      setLoading(false);
    });
  };
  const apiCall = (product) =>
    new Promise((resolve, reject) => {
      client.items
        .update(product.ID, {
          saleBanner: product["Sale Banner"],
        })
        .then((item) => {
          client.items
            .publish(item.id)
            .then((item) => {
              console.log(item);
              resolve(item);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
    });

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
      <Tabs w="100%" minH="350px" p="2">
        <TabList>
          <Tab fontSize="xl">DownLoad</Tab>
          <Tab fontSize="xl">Upload</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box padding="4" maxW="3xl">
              <Stack direction="column" spacing={5}>
                <GetProducts
                  type="Mattresses"
                  productId="365476"
                  client={client}
                />
                <GetProducts
                  type="Accessories"
                  productId="344107"
                  client={client}
                />
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel>
            {loading ? (
              <Flex
                pt="10"
                flexDirection="column"
                justifyContent="center"
                h="100%"
                alignItems="center"
                minH="250px"
              >
                <Spinner
                  w="150px"
                  h="150px"
                  thickness="12px"
                  speed="0.95s"
                  color="blue.500"
                />
              </Flex>
            ) : (
              <Flex
                pt="10"
                flexDirection="column"
                justifyContent="space-between"
                h="100%"
                minH="250px"
              >
                <FileUploader handleFile={setNewProducts} />

                <Button
                  size="lg"
                  colorScheme="blue"
                  onClick={updateProducts}
                  disabled={newProducts === null ? true : false}
                  leftIcon={<RepeatIcon />}
                >
                  Send Updates
                </Button>
              </Flex>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
