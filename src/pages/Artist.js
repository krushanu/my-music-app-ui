import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArtistCard from "../components/ArtistCard";

const EACHCALLLIMIT = 5
let toastPostId

const Artist = () => {

  const [endOfPage, setEndOfPage] = useState(false)
  const [pageOffset, setPageOffset] = useState(0)
  const [artistData, setArtistData] = useState([])

  useEffect(() => {
    setPageOffset(1)
  }, [])

  const nextPage = () => {
    toastPostId = toast.loading("Geting your data.", { id: toastPostId })
    setPageOffset(pageOffset + 1)
  }

  const fetchArtistData = async () => {
    try {
      if (!endOfPage && pageOffset > 0) {
        const newArtistData = await getData(`/artists?_page=${pageOffset}&_limit=${EACHCALLLIMIT}`)
        toast.success("Here you go.", { id: toastPostId })
        if (EACHCALLLIMIT > newArtistData.length) setEndOfPage(true)
        return newArtistData
      }
    } catch (error) {
      toast.error("Something went wrong while getting your data.", { id: toastPostId })
      console.error("err: ", error)
    }
  }

  const { data, refetch } = useQuery({
    queryFn: fetchArtistData,
    queryKey: ["Artist-Data"],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    onSuccess: (data) => {
      if (data?.length) setArtistData(a => [...a, ...data])
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
      <h1>List of Artists</h1>
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
          {artistData.map(eachData => {
            return (
              <ArtistCard key={eachData.id} artistData={eachData} />
            )
          })}
        </Grid>
        <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
      </Grid >
    </>
  )
};

export default Artist;
