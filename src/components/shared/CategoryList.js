import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import imgx1 from "../../assets/images/Building_systems_1200x760.jpg";
import imgx2 from "../../assets/images/yellow-foot-residential-building-oa-lab_6.jpg";
import imgx4 from "../../assets/images/BeachGreenDunesPhoto4-1024x693.png";

import { useNavigate } from "react-router-dom";

export default function RecipeReviewCard() {
  let history = useNavigate();

  const cardUI = (text, img, link, height) => {
    return (
      <Card onClick={() => history(link)} style={{ cursor: "pointer" }}>
        <CardMedia
          component="img"
          height={height || "200"}
          image={img}
          alt="Paella dish"
        />
        <CardContent style={{ backgroundColor: "#11111114" }}>
          <Typography
            component="h1"
            variant="h7"
            align="left"
            color="text.primary"
            fontSize="25px"
            style={{ textAlign: "center" }}
          >
            {text}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Typography
            component="h3"
            variant="h7"
            textAlign="left"
            color="text.primary"
            style={{ fontSize: 17, fontWeight: "bold" }}
          >
            Browse by category
          </Typography>
          <br />
        </Grid>

        <Grid item xs={4}>
          {cardUI(`Building 1`, imgx1, `/category/project-1`)}
        </Grid>
        <Grid item xs={4}>
          {cardUI(`Building 2`, imgx2, `/category/project-2`)}
        </Grid>

        <Grid item xs={4}>
          {cardUI(`Building 3`, imgx4, `/category/project-3`)}
        </Grid>
      </Grid>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
}
