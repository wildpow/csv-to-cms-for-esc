import { useState } from "react";
import {
  Box,
  Flex,
  Center,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  FormControl,
  FormLabel,
  TabPanel,
  Container,
  Input,
} from "@chakra-ui/react";
import { DownloadIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { SiteClient } from "datocms-client";

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
  const fileUpload = (e) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = function (event) {
      // The file's text will be printed here
      const csvData = PapaParse.parse(reader.result, { header: true });
      // console.log(event.target.result);
      setNewMatts(csvData.data);
    };
    // reader.onload = (e) => {
    //   const csvData = PapaParse(reader.result);
    //   console.log(csvData);
    // };
    reader.readAsText(file);
  };
  const updateMatts = () => {
    newMatts.forEach((matt) => {
      // console.log(matt["Sale Banner"], matt.ID);
      client.items
        .update(matt.ID, {
          saleBanner: matt["Sale Banner"],
        })
        .then((item) => {
          client.items
            .publish(item.id)
            .then((item) => console.log(item))
            .catch((error) => console.log(error));
          // console.log(item);
        })
        .catch((error) => {
          console.log(error);
        });
    });
    console.log(newMatts);
  };
  return (
    <Container maxW="xl" centerContent>
      <Tabs>
        <TabList>
          <Tab>DownLoad</Tab>
          <Tab>Upload</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box padding="4" maxW="3xl">
              {matts ? (
                <Button
                  size="lg"
                  onClick={() => {
                    console.log(matts);
                    downloadMatts(
                      { id: "ID", name: "Name", saleBanner: "Sale Banner" },
                      matts,
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
            Upload now!
            {newMatts ? (
              <Button onClick={updateMatts}>Send Updates</Button>
            ) : (
              <FormControl>
                <FormLabel>
                  Upload
                  <Input
                    type="file"
                    onChange={fileUpload}
                    accept=".csv"
                    placeholder="large size"
                    size="lg"
                    variant="filled"
                  />
                </FormLabel>
              </FormControl>
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
