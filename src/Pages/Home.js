import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TopBanner from "../components/Header/TopBanner";
import BlogList from "../components/shared/BlogList";
import CategoryList from "../components/shared/CategoryList";
export default function HomePage() {
  return (
    <>
      <TopBanner></TopBanner>

      <Container>
        <Box
          sx={{
            pt: 4,
            pb: 2,
          }}
        >
          <CategoryList />
        </Box>

        <BlogList />
      </Container>
      <div style={{ marginTop: 50 }}></div>
    </>
  );
}
