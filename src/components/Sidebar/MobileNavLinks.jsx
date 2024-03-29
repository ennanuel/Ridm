import { useLocation } from "react-router-dom"

import MusicPlayer from "../MusicPlayer"
import Links from "./Links";
import SecondLinks from "./SecondLinks";

import { links, secondLinks } from "../../assets/data/constants";

const MobileNavLinks = () => {
    const location = useLocation()
    return (
        <div className="lg:hidden flex flex-col gap-2 sticky bottom-0 left-0 z-[9999] w-full p-0">
            <MusicPlayer forMobile={true} />
            <nav className="relative z-[10]  w-full h-[70px] border-t border-gray-500/50 bg-[#151515]">
                <ul className="w-full h-full flex flex-row items-center justify-evenly md:justify-center gap-3 text-xs">
                    {
                        links.map(item => (
                            <Links
                                active={((new RegExp(item.to, 'i')).test(location.pathname || '') && item.to !== '/') || ((!(/(genres|charts|playlist|favorites)/i).test(location.pathname)) && item.to === '/')}
                                link={item}
                            />
                        )
                        )
                    }
                    {
                        secondLinks.map((secondLink, i) => <SecondLinks key={i} link={secondLink} active={(new RegExp(secondLink.to, 'i')).test(location.pathname)} />)
                    }
                </ul>
            </nav>
        </div>
    )
};
  
export default MobileNavLinks