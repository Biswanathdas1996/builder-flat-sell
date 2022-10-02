import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@material-ui/core/FormControl";

export default function ImageRadioButton({
  lable,
  images,
  onClick,
  value,
  noZoom,
}) {
  const [height, setHeight] = React.useState(100);
  const [weight, setWeight] = React.useState(500);

  const updateDimention = () => {
    setHeight(200);
    setWeight(600);
  };
  const resetDimention = () => {
    setHeight(100);
    setWeight(500);
  };

  return (
    <div
      className="form-group"
      style={{ marginLeft: 10, marginTop: 10 }}
      // onMouseEnter={() => !noZoom && updateDimention()}
      // onMouseLeave={() => !noZoom && resetDimention()}
    >
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
            {images?.map(({ image, name }) => {
              return (
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <label className="radio-img">
                    <input
                      type="radio"
                      name={lable}
                      value={name}
                      onClick={onClick}
                      checked={value && value === name}
                    />
                    <div className="image">
                      <img
                        src={image}
                        alt="jj"
                        height={height}
                        width={weight}
                      />
                    </div>
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
