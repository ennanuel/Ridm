import { useGetTopRadiosQuery } from "../../redux/services/DeezerApi"

import { Radios } from "../List"
import { MoreButton } from "../Buttons"

const RadioChart = ({ blacklist, favorites }) => {
  const {data, isFetching, error} = useGetTopRadiosQuery(50)

  return (
    <>
    <Radios blacklist={blacklist} favorites={favorites} radios={data?.data} isFetching={isFetching} error={error} />
    <MoreButton />
    </>
  )
}

export default RadioChart
