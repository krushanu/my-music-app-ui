import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import { Grid } from "@mui/material";
import LoadMore from "../components/LoadMoreButton";

const EACHCALLLIMIT = 6

const Song = () => {

  const [endOfPage, setEndOfPage] = useState(false)
  const [pageOffset, setPageOffset] = useState(0)
  const [songData, setSongData] = useState([])

  useEffect(() => {
    setPageOffset(1)
  }, [])

  const nextPage = () => setPageOffset(pageOffset + 1)

  useEffect(() => {
    const updateDataList = (newData) => {
      if (newData.length) setSongData(a => [...a, ...newData])
    }
    const fetchData = async () => {
      try {
        if (!endOfPage && pageOffset > 0) {
          const newSongData = await getData(`/songs?_page=${pageOffset}&_limit=6`)
          if (EACHCALLLIMIT > newSongData.length) setEndOfPage(true)
          updateDataList(newSongData)
        }
      } catch (error) {
        console.error("err: ", error)
      }
    }
    fetchData();
  }, [pageOffset]);

  return (
    <>
      <Link to="/">Back</Link>
      <h1>Song Articles</h1>
      {songData.map(eachData => {
        return <Grid xl={12} key={eachData.id}>{eachData.name}</Grid>
      })}

      <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
    </>
  )
};

export default Song;


