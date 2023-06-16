import { useState, useEffect } from 'react'

const ArtistLoading = ({ num }) => {
    const [artists, setArtists] = useState([])

    useEffect(() => {
        if(!num || typeof(num) !== 'number') return;

        setArtists( prev => {
            const values = []
            for(let i = num; i > 0 && values.length <= num; i--) {
                values.push(i)
            }
            return values
        })
    }, [])

    const Artist = () => (
        <div className='flex flex-col rounded-md gap-2 p-2 bg-white/5 loading-animation'>
            <div className="aspect-square rounded-lg bg-black/50"></div>
            <div className="w-[70%] h-[20px] rounded-sm bg-black/50"></div>
        </div>
    )

    return (
        <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 lg:gap-6 md:gap-4 gap-2'>
            {
                artists.map( artist => <Artist key={artist} /> )
            }
        </div>
    )
}

export default ArtistLoading

