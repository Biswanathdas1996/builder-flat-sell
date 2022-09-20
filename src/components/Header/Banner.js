import React from "react";
import HeaderWrapper from "./HeaderWrapper";

import FeatureWrapper from "./FeatureWrapper";
import FeatureTitle from "./FeatureTitle";

function HeaderCompound({ project, children }) {
  return (
    <HeaderWrapper className="header-wrapper-home-category">
      <div class="layer" style={{ paddingTop: 200 }}>
        <FeatureWrapper className="feature-wrapper-home">
          <FeatureTitle className="feature-title-home">
            Explore a whole new way of purchasing home with {project}
          </FeatureTitle>
        </FeatureWrapper>
        <center>
          <h2 className="h2-sub-text">Purchasing home platform</h2>
        </center>

        {children}
      </div>
    </HeaderWrapper>
  );
}

export default HeaderCompound;
