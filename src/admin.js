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
  TabPanel,
  Container,
} from "@chakra-ui/react";
import { DownloadIcon, ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { SiteClient } from "datocms-client";
import { downloadMatts } from "./downloadData";
const client = new SiteClient(process.env.REACT_APP_DATO);

export default function Admin() {
  const [matts, setMatts] = useState(null);
  const [loadingMatt, setLoadingMatts] = useState(false);
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
                  onClick={() =>
                    downloadMatts(
                      { id: "ID", name: "Name", saleBanner: "Sale Banner" },
                      matts,
                      "matts"
                    )
                  }
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
                >
                  Get Mattresses
                </Button>
              )}
            </Box>
          </TabPanel>
          <TabPanel>
            Upload now!
            <Box padding="4" bg="gray.100" maxW="3xl">
              There are many benefits to a joint design and development system.
              Not only does it bring benefits to the design team.
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
