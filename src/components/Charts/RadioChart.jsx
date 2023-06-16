import { useGetTopRadiosQuery } from "../../redux/services/DeezerApi"

import { Radios } from "../List"

const RadioChart = () => {
  const {data, isFetching, error} = useGetTopRadiosQuery(50)

  return (
    <Radios radios={data?.data || []} isFetching={isFetching} error={error} />
  )
}

export default RadioChart
