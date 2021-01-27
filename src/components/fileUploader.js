import { Button } from "@chakra-ui/react";
import { useRef } from "react";

export default function FileUploader({ handleFile }) {
  const hiddenFileInput = useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <>
      <Button onClick={handleClick}>Upload CSV</Button>
      <input
        accept=".csv"
        type="file"
        style={{ display: "none" }}
        ref={hiddenFileInput}
        onChange={handleChange}
      />
    </>
  );
}
