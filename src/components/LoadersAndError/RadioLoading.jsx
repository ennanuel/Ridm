import { useState, useEffect } from 'react'

const RadioLoading = ({ num }) => {
    const [radios, setRadios] = useState([])

    useEffect(() => {
        if(!num || typeof(num) !== 'number') return;

        setRadios( prev => {
            const values = []
            for(let i = num; i > 0 && values.length <= num; i--) {
                values.push(i)
            }
            return values
        })
    }, [])

    const Radio = () => (
        <div className='flex flex-col gap-2 p-2 bg-white/5 loading-animation'>
            <div className="aspect-square rounded-md bg-black/50"></div>
            <div className="w-[50%] h-[25px] rounded-sm bg-black/50"></div>
        </div>
    )

    return (
        <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 lg:gap-6 md:gap-4 gap-2'>
            {
                radios.map( radio => <Radio key={radio} /> )
            }
        </div>
    )
}

export default RadioLoading
