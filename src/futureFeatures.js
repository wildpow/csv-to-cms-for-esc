const TestFilterDiff = () => {
  // const results = matts.filter(
  //   ({ id: id1, saleBanner: saleBanner1 }) =>
  //     !newMatts.some(
  //       ({ ID: id2, "Sale Banner": saleBanner2 }) =>
  //         id2 === id1 && saleBanner1 !== saleBanner2
  //     )
  // );
  const results2 = newMatts.filter(({ ID: id1, "Sale Banner": saleBanner1 }) =>
    matts.some(
      ({ id: id2, saleBanner: saleBanner2 }) =>
        id2 === id1 && saleBanner1 !== saleBanner2
    )
  );
  console.log(results2);
};
