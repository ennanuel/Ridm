import React, { useEffect, useState } from 'react'
import RadioCard from '../Cards/RadioCard'
import { RadioLoading, Error } from '../LoadersAndError'
import { getData } from '../../functions/getData'

import SeeMore from './SeeMore'

const Radios = ({ radios, children, showmore, isFetching, error, blacklist, favorites, genreid }) => {
    const [newRadios, setNewRadios] = useState([])

    useEffect(() => {
        setNewRadios(getData( {type: 'radios', data: radios, blacklist, favorites}) )
    }, [favorites, blacklist, radios])

    return (
        <>
        <div className="flex flex-row justify-between items-center mb-4">
            <h3 className="text-white font-bold text-xl">{children}</h3>
            {
                showmore && <SeeMore link={`/charts?type=radio&genre=${genreid}`} />
            }
        </div>
        {
            isFetching ?
            <RadioLoading num={4} /> :
            error ?
            <Error title="Could not load radios." /> :
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {
                    newRadios?.map(
                        (radio, i) => <RadioCard key={i} radio={radio} i={i} />
                    )
                }
            </div>
        }
        </>     
    )
}

export default Radios
