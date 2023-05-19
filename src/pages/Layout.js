import { Outlet } from "react-router-dom";
import QueryWrapper from "../util/QueryWrapper";
import { Box, Container, Typography } from "@mui/material";
import Collection from "../components/Collection";

const Layout = () => {
  return (
    <QueryWrapper>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            My Song Collection
          </Typography>
          <Collection />

          <Outlet />
        </Box>
      </Container>
    </QueryWrapper>
  )
};

export default Layout;

