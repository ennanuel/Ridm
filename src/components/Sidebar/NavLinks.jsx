import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Links from "./Links";
import SecondLinks from "./SecondLinks";
import Footer from "./Footer";
import { links, secondLinks } from "../../assets/data/constants";


const NavLinks = () => {
    const location = useLocation()

    return (
        <nav className="row-span-2 sticky top-0 left-0 lg:flex hidden flex-col py-10 px-5 h-[100vh] bg-[#151515] border-r border-white/5">
            <Logo />
            <div className="flex flex-col justify-between h-full align-start">
                <ul className="mt-10 flex flex-col gap-1">
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
                <ul className="flex flex-col gap-2 border-y border-white/10 pt-4 pb-5">
                    <h2 className="font-semibold text-lg text-white mb-2">Your Library</h2>
                    {
                        secondLinks.map((secondLink, i) => <SecondLinks key={i} link={secondLink} active={(new RegExp(secondLink.to, 'i')).test(location.pathname)} />)
                    }
                </ul>
                <Footer />
            </div>
        </nav>
    )
};

export default NavLinks