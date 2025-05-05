import { useLocation } from "react-router-dom"

import MusicPlayer from "../MusicPlayer"
import Links from "./Links";
import SecondLinks from "./SecondLinks";

import { links, secondLinks } from "../../assets/data/constants";

const MobileNavLinks = () => {
    const location = useLocation();
    
    return (
        <div className="lg:hidden flex flex-col fixed bottom-0 left-0 z-[9999] w-full p-0">
            <MusicPlayer forMobile={true} />
            <nav className="relative z-[10] border h-[70px] border-t border-white/5 bg-black/5 backdrop-blur-lg m-2 rounded-[15px]">
                <ul className="w-full h-full flex flex-row items-center justify-evenly md:justify-center gap-3 text-xs px-2">
                    {
                        links.map((item, index) => (
                            <Links
                                key={index}
                                active={((new RegExp(item.to, 'i')).test(location.pathname || '') && item.to !== '/') || ((!(/(genres|charts|playlist|favorites)/i).test(location.pathname)) && item.to === '/')}
                                link={item}
                            />
                        )
                        )
                    }
                    {
                        secondLinks.map((secondLink, index) => (
                            <SecondLinks 
                                key={index} 
                                link={secondLink} 
                                active={(new RegExp(secondLink.to, 'i')).test(location.pathname)} 
                            />
                        ))
                    }
                </ul>
            </nav>
        </div>
    )
};
  
export default MobileNavLinks