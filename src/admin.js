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
  // useToast,
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
  // const toast = useToast();
  const [newProducts, setNewProducts] = useState(null);
  const updateMatts = () => {
    newProducts.forEach((matt) => {
      client.items
        .update(matt.ID, {
          saleBanner: matt["Sale Banner"],
        })
        .then((item) => {
          client.items
            .publish(item.id)
            .then((item) => console.log(item))
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          console.log(error);
        });
    });
    // console.log(newMatts);
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
                onClick={updateMatts}
                disabled={newProducts === null ? true : false}
                leftIcon={<RepeatIcon />}
              >
                Send Updates
              </Button>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
