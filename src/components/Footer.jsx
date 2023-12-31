import React from "react";
import { Typography, Container } from "@mui/material";
import { styled } from "@mui/system";

const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.background.orange,
  padding: theme.spacing(2),
  borderTop: "1px solid lightblue",
  boxShadow: "0px -8px 6px -1px rgba(0, 0, 0, 0.1)",
}));

const Footer = () => {
  return (
    <div
      style={{
        position: "fixed",
        left: "0",
        bottom: "0",
        width: "100%",
        fontWeight: "900",
        backgroundColor: "slateblue",
        opacity: ".8",
        color: "white",
      }}
    >
      <FooterContainer>
        <Container>
          <Typography variant="body1" align="center" color="#eee">
            Developed by <a href="https://github.com/Cakirfan" target="_blank" style={{ color: "#000", fontWeight: "700"}}>Cakirfan</a>
          </Typography>
          <Typography variant="body1" align="center" color="#eee">
            Copyright © MyCoding {new Date().getFullYear()}
          </Typography>
        </Container>
      </FooterContainer>
    </div>
  );
};

export default Footer;
