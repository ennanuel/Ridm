import { useState } from 'react'

import { useGetTopRadiosQuery } from "../../redux/services/DeezerApi"

import { Radios } from "../List"
import { MoreButton } from "../Buttons"

const RadioChart = ({ blacklist, favorites }) => {
  const [limit, setLimit] = useState(true)
  const {data, isFetching, error} = useGetTopRadiosQuery(50)

  return (
    <>
    <Radios blacklist={blacklist} favorites={favorites} radios={data?.data?.slice(0, limit ? 20 : 50)} isFetching={isFetching} error={error} />
    <MoreButton limit={limit} setLimit={setLimit} length={data?.data?.length} />
    </>
  )
}

export default RadioChart
