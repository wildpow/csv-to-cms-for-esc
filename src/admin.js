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
} from "@chakra-ui/react";
import { DownloadIcon, RepeatIcon } from "@chakra-ui/icons";
import { SiteClient } from "datocms-client";
import FileUploader from "./components/fileUploader";
import { downloadMatts } from "./downloadData";
import PapaParse from "papaparse";
const client = new SiteClient(process.env.REACT_APP_DATO);

export default function Admin() {
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
    setMatts(stuff);
  }
  const fileUpload = (file) => {
    let reader = new FileReader();
    reader.onload = function (event) {
      const csvData = PapaParse.parse(reader.result, { header: true });
      setNewMatts(csvData.data);
    };
    reader.readAsText(file);
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
  const TestFilterDiff = () => {
    // const results = matts.filter(
    //   ({ id: id1, saleBanner: saleBanner1 }) =>
    //     !newMatts.some(
    //       ({ ID: id2, "Sale Banner": saleBanner2 }) =>
    //         id2 === id1 && saleBanner1 !== saleBanner2
    //     )
    // );
    const results2 = newMatts.filter(
      ({ ID: id1, "Sale Banner": saleBanner1 }) =>
        matts.some(
          ({ id: id2, saleBanner: saleBanner2 }) =>
            id2 === id1 && saleBanner1 !== saleBanner2
        )
    );
    console.log(results2);
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
      <Button onClick={() => TestFilterDiff()}>
        Test filtering data from CMS and uploading CSV
      </Button>
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
            {newMatts ? (
              <Button onClick={updateMatts}>Send Updates</Button>
            ) : (
              <FileUploader handleFile={fileUpload} />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
