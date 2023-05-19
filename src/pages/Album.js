import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

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

  const { data, isLoading, refetch } = useQuery({
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
      <Link to="/">Back</Link>
      <h1>Album</h1>
      {albumData?.map(eachData => {
        return <p key={eachData.id}>{eachData.name}</p>
      })}
      <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
    </>
  )
};

export default Album;


