import { useLocation } from "react-router-dom"

import MusicPlayer from "../MusicPlayer"
import Links from "./Links"
import SecondLinks from "./SecondLinks"

const MobileNavLinks = ({ activeSong, links, secondLinks }) => {
    const location = useLocation()
    return (
        <div className="fixed lg:hidden z-[9999] bottom-0 left-0 w-full flex flex-col gap-1">
        {
            (activeSong?.title && window.innerWidth < 1024) && <MusicPlayer />
        }
        <nav style={{background: 'var(--color)'}} className="relative z-[10] rounded-tl-2xl rounded-tr-2xl bottom-0 left-0 w-full p-2">
            <ul className="w-full flex flex-row items-center sm:justify-between md:justify-center gap-3 text-xs">
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
                secondLinks.map( (secondLink, i) => <SecondLinks key={i} link={secondLink} active={(new RegExp(secondLink.to, 'i')).test(location.pathname)} />)
            }
            </ul>
        </nav>
    </div>
  )
}
  
export default MobileNavLinks