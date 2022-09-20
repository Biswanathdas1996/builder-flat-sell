import Grass from "../assets/images/images (1).jpg";
import Road from "../assets/images/199-1994430_open-window-icon-open-window-icon.png";

export const allStates = [
  {
    id: "1",
    type: "For Sale",
    value: "Listable",
  },
  {
    id: "2",
    type: "Sold ",
    value: "Visible",
  },
];

export const accessablity = {
  Listable: "1",
  Visible: "2",
};

export const badgeUI = (listingState) => {
  switch (listingState) {
    case "1":
      return Road;
    case "2":
      return Grass;

    default:
    // code block
  }
};

export const getTokenListingState = (id) => {
  const filterData = allStates.find((val) => val.id === id);
  return filterData?.type;
};

export const userAllowedActions = ["1", "2"];

// asset those are having img on the map
export const assetHavingImage = ["1", "2"];
