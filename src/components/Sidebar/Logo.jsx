import { logo } from "../../assets/images"

const Logo = () => {
  return (
    <div className="w-full flex flex-row gap-[5px] items-center">
        <img src={logo} alt="logo" className="h-[40px]"/>
        <h2 className="w-max text-white font-semibold text-3xl">Ridm.</h2>
    </div>
  )
}

export default Logo
