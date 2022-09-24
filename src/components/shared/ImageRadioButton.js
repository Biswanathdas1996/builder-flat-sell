import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FormControl from "@material-ui/core/FormControl";

export default function ImageRadioButton({ lable, images, onClick }) {
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
            {images?.map(({ image, name }) => {
              return (
                <Grid item lg={2} md={2} sm={12} xs={12}>
                  <label className="radio-img">
                    <input
                      type="radio"
                      name={lable}
                      value={name}
                      onClick={onClick}
                    />
                    <div className="image">
                      <img src={image} alt="jj" height={100} width={500} />
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
