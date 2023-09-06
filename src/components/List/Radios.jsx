import React, { useEffect, useState } from 'react'
import RadioCard from '../Cards/RadioCard'
import { RadioLoading, Error } from '../LoadersAndError'
import { getData } from '../../functions/getData'

import SeeMore from './SeeMore'

const Radios = ({ radios, children, showmore, isFetching, error, blacklist, favorites, genreid, noFilter }) => {
    const [newRadios, setNewRadios] = useState([])

    useEffect(() => {
        setNewRadios(getData( {type: 'radios', data: radios, blacklist, favorites, noFilter}) )
    }, [favorites, blacklist, radios, noFilter])

    return (
        <div>
        <div className="flex flex-row justify-between items-end mb-4">
            <h3 className="text-white font-bold text-xl">{children}</h3>
            {
                showmore && <SeeMore link={`/charts?type=radios&genre=${genreid}`} />
            }
        </div>
        {
            isFetching ?
            <RadioLoading num={5} /> :
            error ?
            <Error title="Could not load radios." /> :
            !isFetching && !error && newRadios?.length < 1 ?
            <Error title="Nothing was found" /> :
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {
                    newRadios?.map(
                        (radio, i) => <RadioCard key={i} radio={radio} i={i} />
                    )
                }
            </div>
        }
        </div>     
    )
}

export default Radios
