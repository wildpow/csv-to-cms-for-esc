import {
  Button,
  Flex,
  Container,
  Box,
  Heading,
  useToast,
} from "@chakra-ui/react";
import PapaParse from "papaparse";
import { useRef, useState } from "react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
export default function FileUploader({ handleFile }) {
  const hiddenFileInput = useRef(null);
  const toast = useToast();
  const [hover, setHover] = useState(false);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    if (event.target.files[0] !== undefined) {
      const fileUploaded = event.target.files[0];
      console.log(event.target.files[0]);
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
          setFileName(fileUploaded.name);
        } else {
          toast({
            title: "Problem loading CSV",
            description:
              "Uploaded CSV is missing one of the required rows. (ID, NAME, SALE BANNER)",
            status: "error",
            duration: 6000,
            isClosable: true,
          });
        }
      };
      reader.readAsText(fileUploaded);
    }
  };
  const handleDelete = () => {
    setFileName("");
    setHover(false);
    handleFile(null);
  };
  const [fileName, setFileName] = useState("");
  return (
    <Container p="0">
      <Flex w="100%">
        {fileName.length !== 0 ? (
          <Button
            // rightIcon={<CloseIcon />}
            onClick={() => handleDelete()}
            variant="outline"
            size="lg"
            borderEndEndRadius="0"
            borderTopRightRadius="0"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <CloseIcon />
          </Button>
        ) : (
          <Button
            leftIcon={<Search2Icon />}
            onClick={handleClick}
            variant="outline"
            size="lg"
            borderEndEndRadius="0"
            borderTopRightRadius="0"
          >
            Upload CSV
          </Button>
        )}
        <Box minHeight="48px" flex="1" h="100%">
          <input
            accept=".csv"
            type="file"
            style={{ display: "none" }}
            ref={hiddenFileInput}
            onChange={handleChange}
          />
          <div
            style={{
              transition: "all 250ms",
              width: "100%",
              height: "100%",
              display: "flex",
              minHeight: "48px",
              alignItems: "center",
              borderRight: "1px solid rgb(226, 232, 240)",
              borderBottom: "1px solid rgb(226, 232, 240)",
              borderTop: "1px solid rgb(226, 232, 240)",
              backgroundColor: hover ? "aliceblue" : "rgb(226, 232, 240)",
              borderTopRightRadius: "0.375rem",
              borderBottomRightRadius: "0.375rem",
            }}
          >
            <Heading
              background="gray.600"
              pl="5"
              fontSize="lg"
              fontWeight="700"
              color="gray.800"
              lineHeight="0"
            >
              {fileName}
            </Heading>
          </div>
        </Box>
      </Flex>
    </Container>
  );
}
