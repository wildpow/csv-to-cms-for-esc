import { useState } from "react";
import PropTypes from "prop-types";
import { Button, useToast } from "@chakra-ui/react";
import { downloadProducts } from "./downloadData";
import { DownloadIcon, RepeatIcon } from "@chakra-ui/icons";
GetProducts.propTypes = {
  client: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  productId: PropTypes.string,
};
GetProducts.defaultProps = {
  type: "Product",
  productId: "344107",
};
export default function GetProducts({ type, productId, client }) {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  function filterProduct(item) {
    let newItem = {};

    function typeofProduct(id) {
      if (id === "15238995") return "Adjustable";
      if (id === "9634568") return "Sheets";
      if (id === "9634572") return "Pillow";
      if (id === "9634571") return "Protector";
      return "Other";
    }
    if (item.id.length > 1) {
      newItem.id = item.id;
      if (item.typeOfProduct) {
        newItem.productType = typeofProduct(item.typeOfProduct);
      } else {
        newItem.productType = "Mattress";
      }
      newItem.name = type === "Mattresses" ? item.name : item.title;
      newItem.saleBanner = item.saleBanner;
    }
    return newItem;
  }
  async function getProducts() {
    setLoading(true);
    const records = await client.items
      .all({
        "page[limit]": 200,
        filter: {
          type: productId,
        },
      })
      .then((res) => {
        setLoading(false);
        return res;
      });
    let stuff = [];
    records.forEach((element) => {
      stuff.push(filterProduct(element));
    });
    toast({
      title: `${type} list Generated`,
      description: `Updated list of ${type.toLowerCase()} have been created. Please Download`,
      status: "success",
      duration: 6000,
      isClosable: true,
    });

    setProducts(stuff);
  }

  return (
    <>
      {products ? (
        <Button
          size="lg"
          variant="outline"
          onClick={() => {
            downloadProducts(
              {
                id: "ID",
                productType: "Type of Product",
                name: "Name",
                saleBanner: "Sale Banner",
              },
              [...products],
              type
            );
          }}
          leftIcon={<DownloadIcon />}
        >
          {`Download ${type}`}
        </Button>
      ) : (
        <Button
          leftIcon={<RepeatIcon />}
          isLoading={loading}
          onClick={() => getProducts()}
          loadingText="Loading..."
          size="lg"
        >
          {`Get ${type}`}
        </Button>
      )}
    </>
  );
}
