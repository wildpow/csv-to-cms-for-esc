import { Button, Flex, Text } from "@chakra-ui/react";
import { useRef, useState } from "react";
import {
  DownloadIcon,
  RepeatIcon,
  CloseIcon,
  Search2Icon,
} from "@chakra-ui/icons";
export default function FileUploader({ handleFile }) {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFileName(event.target.files[0].name);
    handleFile(fileUploaded);
  };
  const handleDelete = () => {
    setFileName("");
    handleFile(null);
  };
  const [fileName, setFileName] = useState("");
  return (
    <Flex alignItems="baseline">
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
      <input
        accept=".csv"
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <Text
        pl="5"
        fontSize="lg"
        fontWeight="700"
        color="blue.700"
        lineHeight="0"
      >
        {fileName}
      </Text>
    </Flex>
  );
}
