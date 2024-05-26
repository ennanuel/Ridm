import { NavLink } from 'react-router-dom'

const SecondLinks = ({ active, link }) => {
    return (
        <li className={`${active ? `lg:bg-transparent transition-transform lg:text-white rounded-md` : 'translate-y-[8px] lg:translate-y-0'} ${link.color}`}>
            <NavLink to={link.to} className={`relative w-[70px] h-[50px] lg:w-auto p-2 lg:p-[6px] lg:h-[40px] rounded-[15px] text-xs lg:text-[1em] flex flex-col lg:flex-row lg:gap-6 justify-center lg:justify-start items-center lg:text-gray-400 hover:lg:text-white font-semibold lg:font-normal lg:hover:bg-white/5 ${active && 'lg:bg-white/5'}`}>
                <span className={`relative w-full lg:w-auto ${active ? `animate-fadein text-black bg-gradient-to-br ${link.bgFrom} ${link.bgTo}` : `lg:bg-white/5 ${link.color}`} flex flex-row justify-center items-center p-1 rounded-3xl lg:rounded-[10px]`}>
                    {
                        active ?
                            <link.altIcon className='text-xl lg:text-xl' /> :
                            <link.icon className="text-xl lg:text-xl" />
                    }
                </span>
                <span className={`relative transition-transform ${active ? 'lg:text-gray-100 block' : 'scale-0 lg:scale-100'} lg:flex-1 text-xs lg:text-sm lg:block`}>{link.name}</span>
            </NavLink>
        </li>
    )
};

export default SecondLinks
