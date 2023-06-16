import { NavLink } from 'react-router-dom'

const SecondLinks = ({active, link}) => {
  return (
    <li className={`${active ? `lg:bg-none transition-transform lg:text-white rounded-md` : 'translate-y-[8px] lg:translate-y-0'} ${link.color}`}>
        <NavLink to={link.to}>
            <p className="relative w-[70px] h-[50px] lg:h-auto p-2 lg:p-0 rounded-md text-xs lg:text-[1em] flex flex-col lg:flex-row lg:gap-2 justify-center lg:justify-start items-center lg:text-gray-400 hover:lg:text-white font-semibold lg:font-bold">
                <span className={`relative w-full ${active ? `animate-fadein text-black bg-gradient-to-br ${link.bgFrom} ${link.bgTo}` : `lg:bg-white/10 ${link.color}`} flex flex-row justify-center items-center p-1 rounded-3xl lg:rounded-sm`}>
                    {
                        active ?
                        <link.altIcon className='text-2xl lg:text-2xl' /> : 
                        <link.icon className="text-xl lg:text-2xl" />
                    }
                </span>
                <span className={`relative transition-transform ${active ? 'lg:text-gray-100 block' : 'scale-0 lg:scale-100'} text-[.9em] lg:text-[1em] lg:block`}>{link.name}</span>
            </p>
        </NavLink>
    </li>
)
}

export default SecondLinks
