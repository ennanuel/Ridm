import { links, secondLinks } from '../../assets/data/constants'

import { useSelector } from "react-redux";

import MobileNavLinks from "./MobileNavLinks"
import NavLinks from "./NavLinks"
import { useGetCountryInfoQuery } from '../../redux/services/DeezerApi';

const Sidebar = () => {
  const { activeSong } = useSelector( state => state.player )
  const {data, isFetching, error} = useGetCountryInfoQuery()

  console.log(data)

  return (
    <>
    <NavLinks links={links} secondLinks={secondLinks} />
    <MobileNavLinks activeSong={activeSong} links={links} secondLinks={secondLinks} />
    </>
  )
}

export default Sidebar;
