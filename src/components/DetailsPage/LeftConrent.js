import {
  Grid,
  Link,
  Typography,
  Card,
  CardContent,
  Tooltip,
  Button,
} from "@mui/material";

import { currentNeteork } from "../../utils/currentNeteork";
import { networkURL } from "../../config";
import MetaImg from "../../assets/images/62e8fce0d4320850482169-min.gif";

const DetailsHead = [
  "Contract Address:",
  "Token ID:",
  "Token Standard:",
  "BlockChain:",
];

export default function LeftConrent({ nftData, tokenId, ContractAddress }) {
  const { description } = nftData;

  return (
    <Card
      sx={{
        border: "0.01px solid rgba(0, 0, 0, 0.09)",
      }}
    >
      <CardContent sx={{ pl: 3 }}>
        <center>
          <img src={MetaImg} alt="tt" />
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              width: "220px",
              height: "40px",
              fontSize: "12px",
              textAlign: "center",
              margin: 5,
            }}
            onClick={() =>
              window.open(
                `https://builder-meta.netlify.app/?room=${tokenId}`,
                "_blank"
              )
            }
          >
            View Flat in Metaverse
          </Button>
        </center>
        <Typography
          variant="subtitle1"
          component="div"
          fontWeight="bold"
          gutterBottom
        >
          Description
        </Typography>

        <Typography variant="subtitle2" paragraph marginBottom="30px">
          {description}
        </Typography>
        <Grid container spacing={1} marginX="1px">
          <Grid xs={5}>
            {DetailsHead.map((heading) => (
              <Typography
                variant="body2"
                paragraph
                item
                key={heading}
                fontWeight="600"
              >
                {heading}
              </Typography>
            ))}
          </Grid>
          <Grid xs={7}>
            <Tooltip title="Contrct Address">
              <Link
                href={`${networkURL()}/address/${ContractAddress}`}
                target="_blank"
                sx={{ textDecoration: "none" }}
              >
                <Typography
                  variant="body2"
                  paragraph
                  item
                  fontWeight="600"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "11rem",
                  }}
                >
                  {ContractAddress}
                </Typography>
              </Link>
            </Tooltip>
            <Tooltip title="Author Name">
              <Typography
                variant="body2"
                paragraph
                item
                fontWeight="600"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "11rem",
                }}
              >
                #{tokenId}
              </Typography>
            </Tooltip>
            <Typography variant="body2" paragraph item fontWeight="600">
              ERC-721
            </Typography>
            <Typography variant="body2" paragraph item fontWeight="600">
              {currentNeteork()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
