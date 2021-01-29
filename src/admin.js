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
  useToast,
  Flex,
} from "@chakra-ui/react";

import {
  DownloadIcon,
  RepeatIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import { SiteClient } from "datocms-client";
import FileUploader from "./components/fileUploader";
import { downloadMatts } from "./downloadData";
import PapaParse from "papaparse";
const client = new SiteClient(process.env.REACT_APP_DATO);

export default function Admin() {
  const toast = useToast();
  const [matts, setMatts] = useState(null);
  const [loadingMatt, setLoadingMatts] = useState(false);
  const [newMatts, setNewMatts] = useState(null);
  async function getMatts() {
    setLoadingMatts(true);
    const records = await client.items
      .all({
        "page[limit]": 100,
        "filter[type]": "365476",
      })
      .then((res) => {
        setLoadingMatts(false);
        return res;
      });
    let stuff = [];
    records.forEach((element) => {
      stuff.push({
        id: element.id,
        name: element.name,
        saleBanner: element.saleBanner,
      });
    });
    toast({
      title: "Products Generated",
      description: "Updated list of proucts have been created. Please Download",
      status: "success",
      duration: 6000,
      isClosable: true,
    });
    setMatts(stuff);
  }
  const fileUpload = (file) => {
    if (file) {
      let reader = new FileReader();
      reader.onload = function (event) {
        const csvData = PapaParse.parse(reader.result, { header: true });
        setNewMatts(csvData.data);
      };
      reader.readAsText(file);
    } else {
      setNewMatts(null);
    }
  };
  const updateMatts = () => {
    newMatts.forEach((matt) => {
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
    console.log(newMatts);
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
              {matts ? (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    console.log(matts);
                    downloadMatts(
                      { id: "ID", name: "Name", saleBanner: "Sale Banner" },
                      [...matts],
                      "matts"
                    );
                  }}
                  leftIcon={<DownloadIcon />}
                >
                  Download Now
                </Button>
              ) : (
                <Button
                  leftIcon={<RepeatIcon />}
                  isLoading={loadingMatt}
                  onClick={() => getMatts()}
                  loadingText="Loading..."
                  size="lg"
                >
                  Get Mattresses
                </Button>
              )}
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
              <FileUploader handleFile={setNewMatts} />

              <Button
                size="lg"
                colorScheme="blue"
                onClick={updateMatts}
                disabled={newMatts === null ? true : false}
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
