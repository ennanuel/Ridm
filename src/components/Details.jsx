import { Outlet } from 'react-router-dom'
import { DetailsHeader } from './Headers'
import { createContext, useState, useEffect } from 'react'
import Actions from './Actions'

export const DetailsContext = createContext({
    data: {},
    color: [],
    isFetching: true,
    error: false,
    updateData: (dat) => null
})

const Details = () => {
    const [data, setData] = useState({ data: {}, colors: [], isFetching: true, error: false })

    const updateData = (dat) => {
        setData(dat)
    }

    return (
        <DetailsContext.Provider value={{...data, updateData}}>
            <DetailsHeader />
            <section style={{ background: `linear-gradient(${data.colors[0]} 50px, #101010 300px)`}} className="backdrop-blur-xl">
                <Actions />
                <Outlet />
            </section>
        </DetailsContext.Provider>
    )
}

export default Details
