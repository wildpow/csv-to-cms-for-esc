import {
  Button,
  Flex,
  Text,
  Spinner,
  Container,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import PapaParse from "papaparse";
import { useRef, useState } from "react";
import {
  DownloadIcon,
  RepeatIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";
export default function FileUploader({ handleFile }) {
  const hiddenFileInput = useRef(null);
  const toast = useToast();

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    setLoading(true);
    const fileUploaded = event.target.files[0];
    // setFileName(event.target.files[0].name);
    let reader = new FileReader();
    reader.onload = function (event) {
      const csvData = PapaParse.parse(reader.result, { header: true });
      let errors = 0;
      csvData.data.forEach((element) => {
        if (element.ID || element.Name || element["Sale Banner"]) {
          errors += 1;
        }
      });
      if (errors > 0) {
        handleFile(csvData.data);
        setFileName(event.target.files[0].name);
        setLoading(false);
      } else {
        toast({
          title: "Problem loading CSV",
          description:
            "Uploaded CSV is missing one of the required rows. (ID, NAME, SALE BANNER)",
          status: "error",
          duration: 6000,
          isClosable: true,
        });
        setLoading(false);
      }
    };
    reader.readAsText(fileUploaded);
  };
  const handleDelete = () => {
    setFileName("");
    handleFile(null);
  };
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  return (
    <Container centerContent={loading} p="0">
      {loading ? (
        <Spinner
          thickness="14px"
          speed="0.95s"
          emptyColor="gray.200"
          color="blue.600"
          size="xl"
          label="Loading"
          w="100px"
          h="100px"
        />
      ) : (
        <Flex alignItems="baseline" w="100%">
          {fileName.length !== 0 ? (
            <Button
              leftIcon={<CloseIcon />}
              onClick={() => handleDelete()}
              variant="outline"
              size="lg"
            >
              Remove CSV
            </Button>
          ) : (
            <Button
              leftIcon={<Search2Icon />}
              onClick={handleClick}
              variant="outline"
              size="lg"
            >
              Upload CSV
            </Button>
          )}
          <Box>
            <input
              accept=".csv"
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
            />
            <Heading
              bgColor="blue.300"
              pl="5"
              fontSize="lg"
              fontWeight="700"
              color="blue.700"
              lineHeight="0"
            >
              {fileName}
            </Heading>
          </Box>
        </Flex>
      )}
    </Container>
  );
}
