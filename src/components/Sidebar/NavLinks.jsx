import { useLocation } from "react-router-dom"

import Logo from "./Logo"
import Links from "./Links"
import SecondLinks from "./SecondLinks"
import Footer from "./Footer"


const NavLinks = ({ links, secondLinks, activeLinks }) => {
    const location = useLocation()

    return (
        <nav className="flex-1 top-0 left-0 lg:flex hidden flex-col py-10 px-5 h-[100vh] max-w-[250px] bg-[#050505]">
            <Logo />
            <div className="flex flex-col justify-between h-full align-start">
                <ul className="mt-10 flex flex-col gap-4">
                {
                    links.map(item => (
                        <Links 
                            active={((new RegExp(item.to, 'i')).test(location.pathname || '') && item.to !== '/') || ((!(/(genres|charts|playlist|favorites)/i).test(location.pathname)) && item.to === '/')} 
                            link={item} 
                        />
                    )
                )
                }
                </ul>
                <ul className="flex flex-col gap-2">
                {
                    secondLinks.map( (secondLink, i) => <SecondLinks key={i} link={secondLink} active={(new RegExp(secondLink.to, 'i')).test(location.pathname)} />)
                }
                </ul>
                <Footer />
            </div>
        </nav>
    )
}

export default NavLinks