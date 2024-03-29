import React, { useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import { Card, Grid } from "@mui/material";
import { _transction_signed, _account } from "../../src/CONTRACT-ABI/connect";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Switch from "@mui/material/Switch";
import DeleteOutlineIcon from "@mui/icons-material/Delete";
import { pink } from "@mui/material/colors";
import TransctionModal from "../components/shared/TransctionModal";
import HeaderWrapper from "../components/shared/BackgroundUI";
import FormGroup from "@mui/material/FormGroup";
// import { getSymbol } from "../utils/currencySymbol";
// import { getResizedFile } from "../utils/reSizeImg";
import { createAnduploadFileToIpfs } from "../utils/ipfs";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { getTokenListingState } from "../utils/tokenListingState";
import "../styles/background.css";
import ImageRadioButton from "../components/shared/ImageRadioButton";
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
} from "../Metaverce_utils/Asset";
import Checkbox from "@mui/material/Checkbox";

const web3 = new Web3(window.ethereum);

const VendorSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  authorname: Yup.string().required("Authorname is required"),
  price: Yup.string().required("Price is required"),
  category: Yup.string().required("category is required"),
});

const Mint = () => {
  const [start, setStart] = useState(false);
  const [response, setResponse] = useState(null);
  const [checked, setChecked] = useState(false);
  const [description, setDescription] = useState(null);
  const [tokenListingState, setTokenListingState] = useState("1");

  const [frontWall, setFrontWall] = useState(null);
  const [backWall, setBackWall] = useState(null);
  const [leftWall, setLeftWall] = useState(null);
  const [rightWall, setRightWall] = useState(null);
  const [topCilling, setTopCilling] = useState(null);
  const [toiletWall, setToiletWall] = useState(null);
  const [entranceDoorImage, setEntranceDoorImage] = useState(null);
  const [frontWindow, setFrontWindow] = useState(null);
  const [windowImageBack, setWindowImageBack] = useState(null);
  const [floorImg, setFloorImg] = useState(null);
  const [appliances, setAppliances] = useState([]);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  let history = useNavigate();

  const saveData = async ({
    token,
    title,
    authorname,
    category,
    attributes,
    price,
    royelty,
  }) => {
    setStart(true);

    let responseData;

    const metaverceData = {
      frontWall,
      backWall,
      leftWall,
      rightWall,
      topCilling,
      toiletWall,
      entranceDoorImage,
      frontWindow,
      windowImageBack,
      floorImg,
      furnished: checked,
      appliances,
    };
    console.log("metaverceData----->", metaverceData);

    const dummyAttrribute = [
      {
        display_type: "date",
        trait_type: "Publish Date",
        value: new Date(),
      },
    ];

    const metaData = {
      name: title,
      author: authorname,
      category: category,
      description: description,
      metaverceData: metaverceData,
      attributes: attributes.concat(dummyAttrribute),
    };

    const resultsSaveMetaData = await createAnduploadFileToIpfs(metaData);

    console.log("---metadta-->", resultsSaveMetaData);
    const account = await _account();

    for (let i = 0; i < token; i++) {
      responseData = await _transction_signed(
        "mintNFT",
        JSON.stringify(resultsSaveMetaData),
        web3.utils.toWei(price.toString(), "ether"),
        royelty,
        category,
        "",
        account,
        tokenListingState
      );

      console.log("Called instance:", i + 1);
    }

    setResponse(responseData);

    console.log("responseData", responseData);
  };

  const modalClose = () => {
    setStart(false);
    setResponse(null);
    history("/");
  };

  const handleAppliancesChange = (e, val) => {
    console.log(appliances);
    if (appliances && appliances?.find((data) => data === val)) {
      appliances?.pop(val);
      setAppliances(appliances);
    } else {
      appliances.push(val);
      setAppliances(appliances);
    }
  };

  return (
    <>
      {start && <TransctionModal response={response} modalClose={modalClose} />}
      <HeaderWrapper className="header-wrapper-forms">
        <div className="form-layer2">
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
            <Grid item lg={10} md={10} sm={12} xs={12}>
              <div style={{ margin: 20 }}>
                <Card
                  style={{
                    background: "#ffffff9e",
                  }}
                >
                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div
                        style={{
                          padding: "20px",
                        }}
                      >
                        <h4>Create NFT</h4>
                        <Formik
                          initialValues={{
                            token: "",
                            authorname: "",
                            title: "",
                            text: "",
                            category: "",
                            royelty: 0,
                            price: "",
                            attributes: [],
                          }}
                          validationSchema={VendorSchema}
                          onSubmit={(values, { setSubmitting }) => {
                            console.log("values=======>", values);
                            saveData(values);
                            setSubmitting(false);
                          }}
                        >
                          {({ touched, errors, isSubmitting, values }) => (
                            <Form>
                              <Grid container>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="token" className="my-2">
                                      No of token{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="token"
                                      autoComplete="flase"
                                      placeholder="Enter no of token"
                                      className={`form-control text-muted ${
                                        touched.token && errors.token
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Title{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="title"
                                      autoComplete="flase"
                                      placeholder="Enter title"
                                      className={`form-control text-muted ${
                                        touched.title && errors.title
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Author Name{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="text"
                                      name="authorname"
                                      autoComplete="flase"
                                      placeholder="Enter Author name"
                                      className={`form-control text-muted ${
                                        touched.authorname && errors.authorname
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Price{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      type="number"
                                      name="price"
                                      autoComplete="flase"
                                      // placeholder={`Enter price in ${getSymbol()}`}
                                      placeholder={`Enter price in INR`}
                                      className={`form-control text-muted ${
                                        touched.price && errors.price
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    />
                                  </div>
                                </Grid>
                                <Grid item lg={6} md={6} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Choose category{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <Field
                                      name="category"
                                      component="select"
                                      className={`form-control text-muted ${
                                        touched.category && errors.category
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                      style={{ marginRight: 10, padding: 9 }}
                                    >
                                      <option>-- Please select --</option>
                                      <option value="project-1">
                                        Building 1
                                      </option>
                                      <option value="project-2">
                                        Building 2
                                      </option>
                                      <option value="project-3">
                                        Building 3
                                      </option>
                                    </Field>
                                  </div>
                                </Grid>
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <label for="title" className="my-2">
                                      Description{" "}
                                      <span className="text-danger">*</span>
                                    </label>
                                    <TextareaAutosize
                                      aria-label="minimum height"
                                      minRows={3}
                                      name="text"
                                      onChange={(e) =>
                                        setDescription(e.target.value)
                                      }
                                      placeholder="Minimum 3 rows"
                                      style={{ width: "100%" }}
                                      className={`form-control text-muted ${
                                        touched.text && errors.text
                                          ? "is-invalid"
                                          : ""
                                      }`}
                                    />
                                  </div>
                                </Grid>

                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <FieldArray
                                      name="attributes"
                                      render={(arrayHelpers) => (
                                        <div>
                                          {values.attributes &&
                                          values.attributes.length > 0 ? (
                                            values.attributes.map(
                                              (attribut, index) => (
                                                <div
                                                  style={{
                                                    border: "1px solid #c7c9cc",
                                                    borderRadius: 5,
                                                    padding: 12,
                                                    marginTop: 15,
                                                  }}
                                                  key={index}
                                                >
                                                  <DeleteOutlineIcon
                                                    onClick={() =>
                                                      arrayHelpers.remove(index)
                                                    }
                                                    sx={{ color: pink[500] }}
                                                    style={{
                                                      marginBottom: 10,
                                                      float: "right",
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                  <Grid container>
                                                    <Grid
                                                      item
                                                      lg={5}
                                                      md={5}
                                                      sm={12}
                                                      xs={12}
                                                      style={{
                                                        marginRight: 20,
                                                      }}
                                                    >
                                                      <Field
                                                        name={`attributes.${index}.trait_type`}
                                                        autoComplete="flase"
                                                        placeholder="Enter Properties name"
                                                        className={`form-control text-muted `}
                                                        style={{
                                                          marginTop: 10,
                                                          padding: 9,
                                                        }}
                                                      />
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      lg={6}
                                                      md={6}
                                                      sm={12}
                                                      xs={12}
                                                    >
                                                      <Field
                                                        name={`attributes.${index}.value`}
                                                        autoComplete="flase"
                                                        placeholder="Enter value"
                                                        className={`form-control text-muted`}
                                                        style={{
                                                          marginTop: 10,
                                                          padding: 9,
                                                        }}
                                                      />
                                                    </Grid>
                                                  </Grid>
                                                </div>
                                              )
                                            )
                                          ) : (
                                            <Button
                                              variant="outlined"
                                              size="medium"
                                              type="button"
                                              onClick={() =>
                                                arrayHelpers.push("")
                                              }
                                            >
                                              {/* show this when user has removed all attributes from the list */}
                                              Add attributes
                                            </Button>
                                          )}
                                          {values.attributes.length !== 0 && (
                                            <Button
                                              variant="outlined"
                                              size="medium"
                                              type="button"
                                              onClick={() =>
                                                arrayHelpers.insert(
                                                  values.attributes.length + 1,
                                                  ""
                                                )
                                              }
                                              style={{
                                                marginTop: 10,
                                              }}
                                            >
                                              + Add
                                            </Button>
                                          )}
                                        </div>
                                      )}
                                    />
                                  </div>
                                </Grid>
                                <Grid
                                  item
                                  lg={12}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                  style={{ marginTop: 20 }}
                                >
                                  <div
                                    className="form-group"
                                    style={{ marginLeft: 10, marginTop: 10 }}
                                  >
                                    <FormControl component="fieldset">
                                      <label for="title" className="my-2">
                                        Choose accessability{" "}
                                      </label>
                                      <RadioGroup
                                        aria-label="gender"
                                        name="gender1"
                                        value={tokenListingState}
                                        onChange={(event) => {
                                          setTokenListingState(
                                            event.target.value
                                          );
                                        }}
                                      >
                                        <FormControlLabel
                                          value="1"
                                          control={<Radio />}
                                          label={getTokenListingState("1")}
                                        />
                                        <FormControlLabel
                                          value="2"
                                          control={<Radio />}
                                          label={getTokenListingState("2")}
                                        />
                                      </RadioGroup>
                                    </FormControl>
                                  </div>
                                </Grid>

                                <Grid
                                  item
                                  lg={12}
                                  md={12}
                                  sm={12}
                                  xs={12}
                                  style={{ marginTop: 20 }}
                                >
                                  <ImageRadioButton
                                    lable={"Choose Cilling Design"}
                                    images={cillingImages}
                                    onClick={(e) =>
                                      setTopCilling(e.target.value)
                                    }
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Floor Design"}
                                    images={floorImage}
                                    onClick={(e) => setFloorImg(e.target.value)}
                                  />

                                  <ImageRadioButton
                                    lable={"Choose Front side Wall Design"}
                                    images={frontWallImages}
                                    onClick={(e) =>
                                      setFrontWall(e.target.value)
                                    }
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Back Side Wall Design"}
                                    images={backWallImages}
                                    onClick={(e) => setBackWall(e.target.value)}
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Left Side Wall Design"}
                                    images={wallImages}
                                    onClick={(e) => setLeftWall(e.target.value)}
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Right Side Wall Design"}
                                    images={wallImages}
                                    onClick={(e) =>
                                      setRightWall(e.target.value)
                                    }
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Washroom Wall Design"}
                                    images={washRoomWallImages}
                                    onClick={(e) =>
                                      setToiletWall(e.target.value)
                                    }
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Door Design"}
                                    images={doorImages}
                                    onClick={(e) =>
                                      setEntranceDoorImage(e.target.value)
                                    }
                                  />
                                  <ImageRadioButton
                                    lable={"Choose Front Window Design"}
                                    images={frontWindowImage}
                                    onClick={(e) =>
                                      setFrontWindow(e.target.value)
                                    }
                                  />

                                  <ImageRadioButton
                                    lable={"Choose Back Window Design"}
                                    images={backWindowImage}
                                    onClick={(e) =>
                                      setWindowImageBack(e.target.value)
                                    }
                                  />
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
                                        type="submit"
                                        value={"Submit"}
                                        style={{
                                          fontSize: 16,
                                          padding: "10px 24px",
                                          borderRadius: 12,
                                        }}
                                      >
                                        Create
                                      </Button>
                                    </span>
                                  </div>
                                </Grid>
                              </Grid>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              </div>
            </Grid>
            <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
          </Grid>
        </div>
      </HeaderWrapper>
    </>
  );
};
export default Mint;
