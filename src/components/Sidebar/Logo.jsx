import { logo } from "../../assets/images"

const Logo = () => {
  return (
    <div className="w-full flex flex-row gap-[5px] px-2 lg:justify-start justify-center items-center">
        <img src={logo} alt="logo" className="w-6 sm:w-8 md:w-5"/>
        <h2 className="w-max text-white font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">Ridm.</h2>
    </div>
  )
}

export default Logo
