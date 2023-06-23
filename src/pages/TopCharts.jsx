import { useEffect, useState } from "react";

import { useSearchParams } from "react-router-dom";

import { categories } from "../assets/data/constants";

import { ChartCard } from "../components/Cards";
import Chart from '../components/Charts'


const TopCharts = () => {
    const [params, setParams] = useSearchParams()
    const [showingType, setShowingType] = useState(categories.some( (cat, i) => cat.to == params.get('type') ))
    const handleClick = (to) => {
        setParams(() => ({type: to}) )
    }

    useEffect(() => {
        const type = params.get('type');
        const text = `Ridm - Top ${categories.some( (cat, i) => cat.to == type ) ? type[0].toUpperCase() + type.substring(1, ) : 'Charts'}`

        setShowingType(categories.some( (cat, i) => cat.to == type ))
        document.getElementById('site_title').innerText = text
    }, [params])

    return (
        <div className="relative h-[100vh] grid grid-cols-2 grid-rows-2 gap-5 p-4 lg:pb-4 pb-[80px] pt-[70px]">
            {
                categories.map(
                    (category, i) => {
                        const type = params.get('type')
                        const active = category.to == type
                        return (
                            <section className={`h-full transition-[transform,opacity] ${(!active && showingType) && 'scale-20 opacity-0 pointer-events-none'}`}>
                                <ChartCard handleClick={handleClick} active={active} type={type} category={category} i={i} />
                                <Chart category={category} active={active} i={i} />
                            </section>
                        )
                    }
                )
            }
        </div>
    )
};

export default TopCharts;
