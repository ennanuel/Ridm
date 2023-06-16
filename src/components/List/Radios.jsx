import React from 'react'
import RadioCard from '../Cards/RadioCard'
import { RadioLoading, Error } from '../LoadersAndError'

const RelatedRadio = ({ radios, children, showmore, isFetching, error }) => {
  return (
    <>
    <div className="flex flex-row justify-between items-center mx-2 lg:mx-5 lg:mt-8">
        <h3 className="text-white font-bold text-xl">{children}</h3>
        {
            showmore &&
            <p className="text-gray-300 font-semibold text-sm transition-opacity opacity-70 hover:opacity-100">See More</p>
        }
    </div>
    {
        isFetching ?
        <RadioLoading num={4} /> :
        error ?
        <Error title="Could not load radios." /> :
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {
                radios?.map(
                    (radio, i) => <RadioCard key={i} radio={radio} i={i} />
                )
            }
        </div>
    }
    </>     
  )
}

export default RelatedRadio
