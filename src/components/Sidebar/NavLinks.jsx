import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import Links from "./Links";
import SecondLinks from "./SecondLinks";
import Footer from "./Footer";
import { links, secondLinks } from "../../assets/data/constants";


const NavLinks = () => {
    const { pathname } = useLocation()

    return (
        <div className="row-span-2 sticky top-2 left-0 z-[10] lg:block hidden h-[calc(100vh-16px)]">
            <nav className="h-full flex flex-col gap-4 pt-10 pb-4 px-2 bg-[#151515bd] rounded-[15px] border border-white/5 shadow shadow-black/30">
                <Logo />
                <ul className="mt-6 flex-1 flex flex-col gap-1">
                    {
                        links.map(item => (
                            <Links
                                active={((new RegExp(item.to, 'i')).test(pathname || '') && item.to !== '/') || ((!(/(genres|charts|playlist|favorites)/i).test(pathname)) && item.to === '/')}
                                link={item}
                            />
                        ))
                    }
                </ul>
                <div className="flex flex-col gap-4 border rounded-[20px] border-white/10 p-2 bg-black/20">
                    <h2 className="font-semibold text-lg text-white px-2 border-b border-white/5 p-2">Your Library</h2>
                    <ul className="flex flex-col gap-2">
                        {
                            secondLinks.map((secondLink, i) => <SecondLinks key={i} link={secondLink} active={(new RegExp(secondLink.to, 'i')).test(pathname)} />)
                        }
                    </ul>
                </div>
                <Footer />
            </nav>
        </div>
    )
};

export default NavLinks