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
        <div className="relative">
        <div className="absolute top-0 left-0 min-h-[90vh] w-full grid grid-cols-2 grid-rows-2 gap-5 p-4">
            {
                categories.map(
                    (category, i) => {
                        const type = params.get('type')
                        const active = category.to == type
                        return (
                            <section className={`h-full transition-[transform,opacity] ${(!active && showingType) && 'scale-20 opacity-0 pointer-events-none'}`}>
                                <ChartCard handleClick={handleClick} active={active} type={type} category={category} i={i} />
                            </section>
                        )
                    }
                )
            }
        </div>
        <div className="p-4 min-h-[90vh]">
            {
                categories.map(
                    (category, i) => {
                        const type = params.get('type')
                        const active = category.to == type
                        return (
                            <section className={`h-full transition-[transform,opacity] ${(!active && showingType) && 'scale-20 opacity-0 pointer-events-none absolute top-0 left-0 h-[80vh] overflow-hidden'}`}>
                                <Chart category={category} active={active} i={i} />
                            </section>
                        )
                    }
                )
            }
        </div>
        </div>
    )
};

export default TopCharts;
