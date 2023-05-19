import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SongCard from "../components/SongCard";

const EACHCALLLIMIT = 5
let toastPostId

const Song = () => {

  const [endOfPage, setEndOfPage] = useState(false)
  const [pageOffset, setPageOffset] = useState(0)
  const [songData, setSongData] = useState([])

  useEffect(() => {
    setPageOffset(1)
  }, [])

  const nextPage = () => {
    toastPostId = toast.loading("Geting your data.", { id: toastPostId })
    setPageOffset(pageOffset + 1)
  }

  const fetchSongData = async () => {
    try {
      if (!endOfPage && pageOffset > 0) {
        const newSongData = await getData(`/songs?_page=${pageOffset}&_limit=${EACHCALLLIMIT}`)
        toast.success("Here you go.", { id: toastPostId })
        if (EACHCALLLIMIT > newSongData.length) setEndOfPage(true)
        return newSongData
      }
    } catch (error) {
      toast.error("Something went wrong while getting your data.", { id: toastPostId })
      console.error("err: ", error)
    }
  }

  const { data, refetch } = useQuery({
    queryFn: fetchSongData,
    queryKey: ["Song-Data"],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    onSuccess: (data) => {
      console.log(data)
      if (data?.length) setSongData(a => [...a, ...data])
    }
  })

  useEffect(() => {
    refetch();
  }, [pageOffset]);

  return (
    <>
      <Link to="/">
        <Button variant="outlined" startIcon={<ArrowBackIcon />}>
          Back
        </Button>
      </Link>
      <h1>List of Songs</h1>
      <Grid container spacing={8}
        display="flex"
        direction="column"
        alignItems="center"
        justifyContent="center"
        maxWidth="lg"
      >
        <Grid container spacing={8}
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="center"
          maxWidth="lg"
          sx={{ mt: 5 }}
        >

          {songData.map(eachData => {
            return (
              <SongCard key={eachData.id} songData={eachData} />
            )
          })}
        </Grid>
        <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
      </Grid>
    </>
  )
};

export default Song;


