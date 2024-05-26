import { NavLink } from "react-router-dom"


const Links = ({active, link}) => {
    return (
        <li className={`${active ? 'lg:font-bold text-white' : 'translate-y-[10px] lg:translate-y-0 text-gray-400 font-semibold hover:lg:text-white'} transition-transform h-[50px] w-[60px] lg:h-auto lg:w-auto rounded-md`}>
            <NavLink to={link.to} className={`h-full w-full flex flex-col lg:flex-row justify-center lg:justify-start items-center gap-1 lg:gap-6 text-xs lg:text-sm lg:hover:bg-white/10 lg:px-4 lg:py-1 lg:h-[40px] lg:rounded-[15px] ${active && 'lg:bg-white/5'}`}>
                    {
                        active ?
                            <span className="border border-white/10 bg-white/5 w-full lg:w-fit lg:border-none lg:bg-transparent p-1 lg:p-0 flex items-center justify-center rounded-3xl">
                                <link.altIcon className='text-2xl lg:text-xl' />
                            </span> : 
                            <span>
                                <link.icon className="text-xl lg:text-xl" />
                            </span>
                    }
                    <span className={`${active ? 'block' : 'scale-0'} transition-transform lg:scale-100 lg:block text-xs lg:text-sm`}>
                        {link.name}
                    </span>
            </NavLink>
        </li>
    )
}

export default Links
