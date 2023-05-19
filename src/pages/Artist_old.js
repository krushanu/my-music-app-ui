import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getData from "../util/connect";
import LoadMore from "../components/LoadMoreButton";

const EACHCALLLIMIT = 6

const Artist = () => {

  const [endOfPage, setEndOfPage] = useState(false)
  const [pageOffset, setPageOffset] = useState(0)
  const [artistData, setArtistData] = useState([])

  useEffect(() => {
    setPageOffset(1)
  }, [])

  const nextPage = () => setPageOffset(pageOffset + 1)

  useEffect(() => {
    const updateDataList = (newData) => {
      if (newData.length) setArtistData(a => [...a, ...newData])
    }
    const fetchData = async () => {
      try {
        if (!endOfPage && pageOffset > 0) {
          const newArtistData = await getData(`/artists?_page=${pageOffset}&_limit=${EACHCALLLIMIT}`)
          if (EACHCALLLIMIT > newArtistData.length) setEndOfPage(true)
          updateDataList(newArtistData)
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
      <h1>Artist Articles</h1>
      {artistData.map(eachData => {
        return <p key={eachData.id}>{eachData.name}</p>
      })}

      <LoadMore endOfPage={endOfPage} nextPage={nextPage} />
    </>
  )
};

export default Artist;


