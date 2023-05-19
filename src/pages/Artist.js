import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

  const { data, isLoading, refetch } = useQuery({
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
      <Link to="/">Back</Link>
      <h1>Artist Articles</h1>
      {artistData.map(eachData => {
        return <p key={eachData.id}>{eachData.name}</p>
      })}
      <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
    </>
  )
};

export default Artist;


