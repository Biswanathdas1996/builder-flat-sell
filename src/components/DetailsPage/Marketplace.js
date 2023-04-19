import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import { _transction_signed } from "../../CONTRACT-ABI/connect";
import { createAnduploadFileToIpfs } from "../../utils/ipfs";
import AssetAddCard from "../shared/AssetAddCard";
import {
  refrigeratorImage,
  acImage,
  almirahImage,
  bedWoodImage,
} from "../../Metaverce_utils/Asset";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TransctionModal from "../shared/TransctionModal";

import FormGroup from "@mui/material/FormGroup";

const Bid = ({ tokenId, nftData }) => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);

  const [refrigerator, setRefrigerator] = useState(
    nftData?.metaverceData?.refrigerator?.image
  );
  const [ac, setAc] = useState(nftData?.metaverceData?.ac?.image);
  const [bedWood, setBedWood] = useState(
    nftData?.metaverceData?.bedWood?.image
  );
  const [almirah, setAlmirah] = useState(
    nftData?.metaverceData?.almirah?.image
  );

  const saveData = async () => {
    setStart(true);
    nftData.metaverceData.refrigerator = { image: refrigerator };
    nftData.metaverceData.ac = { image: ac };
    nftData.metaverceData.almirah = { image: almirah };
    nftData.metaverceData.bedWood = { image: bedWood };
    console.log("----nftData", nftData);

    let resultsSaveMetaData;
    let responseData;
    try {
      resultsSaveMetaData = await createAnduploadFileToIpfs(nftData);
      responseData = await _transction_signed(
        "updateTokenUri",
        tokenId,
        JSON.stringify(resultsSaveMetaData)
      );
    } catch (err) {
      alert("Please refresh the page & try again");
      console.error(err);
      setStart(false);
    }

    setResponse(responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}

      <TabPanel
        value="5"
        sx={{
          backgroundColor: "#F0F6FF",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup>
              <div
                className="form-group"
                style={{ marginLeft: 10, marginTop: 10 }}
              >
                <div style={{ display: "flex", margin: 10 }}>
                  <AssetAddCard
                    lable={"Choose Refrigerator "}
                    images={refrigeratorImage}
                    onClick={(e) => setRefrigerator(e.target.value)}
                    value={refrigerator}
                  />
                </div>
              </div>
            </FormGroup>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup>
              <div
                className="form-group"
                style={{ marginLeft: 10, marginTop: 10 }}
              >
                <div style={{ display: "flex", margin: 10 }}>
                  <AssetAddCard
                    lable={"Choose AC "}
                    images={acImage}
                    onClick={(e) => setAc(e.target.value)}
                    value={ac}
                    height={50}
                    width={300}
                  />
                </div>
              </div>
            </FormGroup>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup>
              <div
                className="form-group"
                style={{ marginLeft: 10, marginTop: 10 }}
              >
                <div style={{ display: "flex", margin: 10 }}>
                  <AssetAddCard
                    lable={"Choose Almirah "}
                    images={almirahImage}
                    onClick={(e) => setAlmirah(e.target.value)}
                    value={almirah}
                    // height={50}
                    // width={500}
                  />
                </div>
              </div>
            </FormGroup>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <FormGroup>
              <div
                className="form-group"
                style={{ marginLeft: 10, marginTop: 10 }}
              >
                <div style={{ display: "flex", margin: 10 }}>
                  <AssetAddCard
                    lable={"Choose Bed Wood "}
                    images={bedWoodImage}
                    onClick={(e) => setBedWood(e.target.value)}
                    value={bedWood}
                    // height={50}
                    // width={500}
                  />
                </div>
              </div>
            </FormGroup>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div
              className="form-group"
              style={{
                marginLeft: 10,
                marginTop: 10,
                float: "right",
              }}
            >
              <span className="input-group-btn">
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    marginX: "15px",
                    marginBottom: "15px",
                  }}
                  type="button"
                  value={"Submit"}
                  on
                  style={{
                    fontSize: 16,
                    padding: "10px 24px",
                    borderRadius: 12,
                  }}
                  onClick={() => saveData()}
                >
                  Add
                </Button>
              </span>
            </div>
          </Grid>
        </Grid>
      </TabPanel>
    </>
  );
};

export default Bid;
