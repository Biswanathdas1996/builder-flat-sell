import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@material-ui/core/FormControl";

export default function AssetAddCard({
  lable,
  images,
  onClick,
  value,
  height = 150,
  width = 250,
}) {
  //   console.group("-----------images", images);
  return (
    <div className="form-group" style={{ marginLeft: 10, marginTop: 10 }}>
      <FormControl component="fieldset">
        <Box sx={{ flexGrow: 1 }}>
          <label
            for="title"
            className="my-4"
            style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}
          >
            {lable}{" "}
          </label>
          <Grid container spacing={1} direction="row">
            {images?.map(({ image, name, title, price }) => {
              return (
                <Grid item lg={3} md={3} sm={12} xs={12}>
                  <label className="radio-img">
                    <input
                      type="radio"
                      name={lable}
                      value={name}
                      onClick={onClick}
                      checked={value && value === name}
                    />
                    <div
                      className="image"
                      style={{ opacity: 1, marginRight: 20 }}
                    >
                      <img src={image} alt="jj" height={height} width={width} />
                    </div>
                    <h4
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        margin: 12,
                      }}
                    >
                      {title}
                      <p
                        style={{
                          fontSize: 8,
                          fontWeight: 100,
                          marginTop: 5,
                        }}
                      >
                        Storing fruits, vegetables, and leftover food items is
                        now convenient with the Haier 195 L HRD-1954CPG-E Direct
                        Cool Single-door Refrigerator
                      </p>
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          marginTop: 5,
                          color: "#229954",
                        }}
                      >
                        <s
                          style={{
                            color: "grey",
                            marginRight: 10,
                            fontWeight: 100,
                          }}
                        >
                          ₹{Number(price) * Number(2)}
                        </s>{" "}
                        ₹{price}
                      </p>
                    </h4>
                  </label>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </FormControl>
    </div>
  );
}
