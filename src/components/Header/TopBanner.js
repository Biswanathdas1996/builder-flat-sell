import React from "react";
import HeaderWrapper from "./HeaderWrapper";
import NavBar from "./NavBar";
import Logo from "./Logo";
import SigninButton from "./SigninButton";
import FeatureWrapper from "./FeatureWrapper";
import FeatureTitle from "./FeatureTitle";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getIcon } from "../../utils/currencyIcon";
import { currentNeteork } from "../../utils/currentNeteork";

function HeaderCompound({ children }) {
  return (
    <HeaderWrapper className="header-wrapper-home">
      <div class="layer">
        <NavBar className="navbar-home">
          <Logo />

          <Stack direction="row" spacing={1} style={{ margin: 10 }}>
            <SigninButton>Account</SigninButton>
            <div style={{ margin: 10, display: "flex" }}>
              <img
                width="20px"
                height="20px"
                src={getIcon()}
                style={{ marginRight: 10 }}
                alt="nft"
              />
              <Typography
                sx={{ fontWeight: "bold", fontSize: "18px", color: "white" }}
              >
                {currentNeteork()}
              </Typography>
            </div>
          </Stack>
        </NavBar>
        <FeatureWrapper className="feature-wrapper-home">
          <FeatureTitle className="feature-title-home">
            Explore a whole new way of purchasing home
          </FeatureTitle>
        </FeatureWrapper>
        <center>
          <h2 className="h2-sub-text" style={{ marginBottom: 40 }}>
            Purchasing home platform
          </h2>
        </center>
        <br />
        {/* <center style={{ margin: 30 }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              marginX: "15px",
              marginBottom: "15px",
            }}
            onClick={() => history("/top-selling")}
            style={{
              fontSize: 16,
              padding: "17px 24px",
              borderRadius: 12,
            }}
          >
            Explore
          </Button>
          <Button
            size="large"
            sx={{
              marginX: "15px",
              marginBottom: "15px",
            }}
            onClick={() => history("/publishArt")}
            style={{
              background: "#808080b0",
              color: "white",
              fontSize: 16,
              padding: "17px 24px",
              borderRadius: 12,
            }}
          >
            Create
          </Button>
        </center> */}
        {children}
      </div>
    </HeaderWrapper>
  );
}

export default HeaderCompound;
