import React, { useState } from "react";
import { TabPanel } from "@mui/lab";
import { _transction_signed } from "../../CONTRACT-ABI/connect";
import { createAnduploadFileToIpfs } from "../../utils/ipfs";
import ImageRadioButton from "../shared/ImageRadioButton";
import {
  cillingImages,
  frontWallImages,
  backWallImages,
  wallImages,
  doorImages,
  frontWindowImage,
  backWindowImage,
  floorImage,
  washRoomWallImages,
} from "../../Metaverce_utils/Asset";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import TransctionModal from "../shared/TransctionModal";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

const Bid = ({ tokenId, nftData }) => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [frontWall, setFrontWall] = useState(nftData?.metaverceData?.frontWall);
  const [backWall, setBackWall] = useState(nftData?.metaverceData?.backWall);
  const [leftWall, setLeftWall] = useState(nftData?.metaverceData?.leftWall);
  const [rightWall, setRightWall] = useState(nftData?.metaverceData?.rightWall);
  const [topCilling, setTopCilling] = useState(
    nftData?.metaverceData?.topCilling
  );
  const [toiletWall, setToiletWall] = useState(
    nftData?.metaverceData?.toiletWall
  );
  const [entranceDoorImage, setEntranceDoorImage] = useState(
    nftData?.metaverceData?.entranceDoorImage
  );
  const [frontWindow, setFrontWindow] = useState(
    nftData?.metaverceData?.frontWindow
  );
  const [windowImageBack, setWindowImageBack] = useState(
    nftData?.metaverceData?.windowImageBack
  );
  const [floorImg, setFloorImg] = useState(nftData?.metaverceData?.floorImg);
  const [furnished, setFurnished] = useState(nftData?.metaverceData?.furnished);

  const saveData = async () => {
    setStart(true);
    nftData.metaverceData.frontWall = frontWall;
    nftData.metaverceData.backWall = backWall;
    nftData.metaverceData.leftWall = leftWall;
    nftData.metaverceData.rightWall = rightWall;
    nftData.metaverceData.topCilling = topCilling;
    nftData.metaverceData.toiletWall = toiletWall;
    nftData.metaverceData.entranceDoorImage = entranceDoorImage;
    nftData.metaverceData.frontWindow = frontWindow;
    nftData.metaverceData.windowImageBack = windowImageBack;
    nftData.metaverceData.floorImg = floorImg;
    nftData.metaverceData.furnished = furnished;
    const resultsSaveMetaData = await createAnduploadFileToIpfs(nftData);
    const responseData = await _transction_signed(
      "updateTokenUri",
      tokenId,
      resultsSaveMetaData.link
    );
    setResponse(responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
  };

  const handleChange = (event) => {
    setFurnished(event.target.checked);
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}

      <TabPanel
        value="4"
        sx={{
          backgroundColor: "#F0F6FF",
          width: "100%",
          overflow: "auto",
        }}
      >
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <label
              for="title"
              className="my-4"
              style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
            >
              Bedroom Partition
            </label>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Bedroom Partition with door space"
                checked={furnished}
                onChange={handleChange}
              />
            </FormGroup>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ImageRadioButton
              lable={"Choose Cilling Design"}
              images={cillingImages}
              onClick={(e) => setTopCilling(e.target.value)}
              value={topCilling}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Floor Design"}
              images={floorImage}
              onClick={(e) => setFloorImg(e.target.value)}
              value={floorImg}
              noZoom={true}
            />

            <ImageRadioButton
              lable={"Choose Front side Wall Design"}
              images={frontWallImages}
              onClick={(e) => setFrontWall(e.target.value)}
              value={frontWall}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Back Side Wall Design"}
              images={backWallImages}
              onClick={(e) => setBackWall(e.target.value)}
              value={backWall}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Left Side Wall Design"}
              images={wallImages}
              onClick={(e) => setLeftWall(e.target.value)}
              value={leftWall}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Right Side Wall Design"}
              images={wallImages}
              onClick={(e) => setRightWall(e.target.value)}
              value={rightWall}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Washroom Wall Design"}
              images={washRoomWallImages}
              onClick={(e) => setToiletWall(e.target.value)}
              value={toiletWall}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Door Design"}
              images={doorImages}
              onClick={(e) => setEntranceDoorImage(e.target.value)}
              value={entranceDoorImage}
              noZoom={true}
            />
            <ImageRadioButton
              lable={"Choose Front Window Design"}
              images={frontWindowImage}
              onClick={(e) => setFrontWindow(e.target.value)}
              value={frontWindow}
              noZoom={true}
            />

            <ImageRadioButton
              lable={"Choose Back Window Design"}
              images={backWindowImage}
              onClick={(e) => setWindowImageBack(e.target.value)}
              value={windowImageBack}
              noZoom={true}
            />

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
                  Update
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
