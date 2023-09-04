import { useEffect, useState } from "react"
import { logo2 } from "../../assets/images"

const Welcome = () => {
    const [styles, setStyles] = useState({
        main: {}, 
        logo: {animation: 'popinslideright 2s forwards'}, 
        logoTxt: {animation: 'sliderightfull 1s 1.3s forwards'}, 
        desc: {animation: 'slowfade 1s 1.5s forwards'}
    })

    useEffect(() => {
        setTimeout(() => {
            setStyles({})
        }, 3000)

        setTimeout(() => {
            setStyles({
                main: {animation: 'slowfade 0.5s 1s forwards reverse'},
                logo: {animation: 'popinslideright 2s forwards reverse'},
                logoTxt: {animation: 'sliderightfull 1s forwards reverse'},
                desc: {animation: 'slowfade 1s forwards reverse'},
            })
        }, 5000)
    }, [])

    return (
        <div 
            style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', ...styles?.main}} 
            className={`fixed top-0 left-0 z-[999999] w-full h-full flex flex-col items-center justify-center gap-2 backdrop-blur-md pointer-events-none`}
        >
            <div className="flex relative justify-center items-center gap-1">
                <div  
                    style={styles.logo} 
                    className={`relative z-[2] ${styles.logo && 'opacity-0 animate-popinslideright'} origin-center rounded-lg flex justify-center items-center`}
                >
                    <img src={logo2} className="h-[50px] lg:h-[60px]" alt="" />
                </div>
                <div className="overflow-hidden text-orange-500">
                    <p 
                        style={styles.logoTxt} 
                        className={`text-xl md:text-2xl text-white font-semibold flex w-full ${styles.logoTxt && 'translate-x-[-100%] animate-sliderightfull'}`}
                    >
                        Ridm.
                    </p>
                </div>
            </div>
            <p 
                style={styles.desc} 
                className={`text-gray-400 text-xs md:text-sm italic ${styles.desc && 'opacity-0 animate-slowfade'}`}
            >
                "Rhythm for everyone!"
            </p>
        </div>
    )
}

export default Welcome