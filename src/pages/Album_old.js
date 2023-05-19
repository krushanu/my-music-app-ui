'use client'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";

const EACHCALLLIMIT = 6

const Album = () => {

  const [endOfPage, setEndOfPage] = useState(false)
  const [pageOffset, setPageOffset] = useState(0)
  const [albumData, setAlbumData] = useState([])

  useEffect(() => {
    setPageOffset(1)
  }, [])

  const nextPage = () => setPageOffset(pageOffset + 1)

  useEffect(() => {
    const updateDataList = (newData) => {
      if (newData.length) setAlbumData(a => [...a, ...newData])
    }
    const fetchData = async () => {
      try {
        if (!endOfPage && pageOffset > 0) {
          const newAlbumData = await getData(`/album?_page=${pageOffset}&_limit=${EACHCALLLIMIT}`)
          if (EACHCALLLIMIT > newAlbumData.length) setEndOfPage(true)
          updateDataList(newAlbumData)
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
      <h1>Album</h1>
      {albumData.map(eachData => {
        return <p key={eachData.id}>{eachData.name}</p>
      })}
      <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
    </>
  )
};

export default Album;


