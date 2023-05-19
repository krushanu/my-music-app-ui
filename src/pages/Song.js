import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

  const { data, isLoading, refetch } = useQuery({
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
      <Link to="/">Back</Link>
      <h1>Song Articles</h1>
      {songData.map(eachData => {
        return <p xl={12} key={eachData.id}>{eachData.name}</p>
      })}
      <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
    </>
  )
};

export default Song;


