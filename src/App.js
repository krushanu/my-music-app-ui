import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Song from "./pages/Song";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth="xxl">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="artist" element={<Artist />} />
            <Route path="album" element={<Album />} />
            <Route path="song" element={<Song />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
