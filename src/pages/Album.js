import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Button, Grid } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AlbumCard from "../components/AlbumCard";

const EACHCALLLIMIT = 5
let toastPostId

const Album = () => {

  const [endOfPage, setEndOfPage] = useState(false)
  const [pageOffset, setPageOffset] = useState(0)
  const [albumData, setAlbumData] = useState([])

  useEffect(() => {
    setPageOffset(1)
  }, [])

  const nextPage = () => {
    toastPostId = toast.loading("Geting your data.", { id: toastPostId })
    setPageOffset(pageOffset + 1)
  }

  const fetchAlbumData = async () => {
    try {
      if (!endOfPage && pageOffset > 0) {
        const newAlbumData = await getData(`/albums?_page=${pageOffset}&_limit=${EACHCALLLIMIT}`)
        toast.success("Here you go.", { id: toastPostId })
        if (EACHCALLLIMIT > newAlbumData.length) setEndOfPage(true)
        return newAlbumData
      }
    } catch (error) {
      toast.error("Something went wrong while getting your data.", { id: toastPostId })
      console.error("err: ", error)
    }
  }

  const { data, refetch } = useQuery({
    queryFn: fetchAlbumData,
    queryKey: ["Album-Data"],
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    onSuccess: (data) => {
      console.log(data)
      if (data?.length) setAlbumData(a => [...a, ...data])
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
      <h1>Album List</h1>
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
        {albumData?.map(eachData => {
          return (
            <AlbumCard key={eachData.id} albumData={eachData} />
          )
        })}
      </Grid>
        <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
      </Grid>
    </>
  )
};

export default Album;


