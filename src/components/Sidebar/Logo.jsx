import { logo } from "../../assets/images"

const Logo = () => {
  return (
    <div className="w-full flex flex-row gap-[5px] px-2 lg:justify-start justify-center items-center">
        <img src={logo} alt="logo" className="h-[30px] md:h-[40px]"/>
        <h2 className="w-max text-white font-semibold text-lg md:text-xl lg:text-2xl">Ridm.</h2>
    </div>
  )
}

export default Logo
