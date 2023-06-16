import { useEffect, useState } from "react"

import { useSelector } from "react-redux"

import Card from "./Card"
import RadioBox from "./RadioBox"
import { useSearchParams } from "react-router-dom"

const RadioCard = ({ radio, i }) => {
  const [params, setParams] = useSearchParams()
  const [show, setShow] = useState(false)

  const { favorites: {radios, ...others} } = useSelector( state => state.library )

  const handleClick = () => {
    setParams({type: 'radios'})
  }


  useEffect(() => {
    setShow(params.get('show') == radio.id)
  }, [params])

  return (
    <div 
      style={{'--delay': i/20 + 's'}} 
      onClick={() => !show && setParams({type: 'radios', show: radio.id})} 
      id={radio.id}
      className={`radio-card relative bg-white/5 transition-[background-color] ${show ? 'p-4 col-span-full row-span-2' : 'p-1 hover:bg-white/10'}`}>
        {
          !show ?
          <Card radio={radio} show={show} /> :
          <RadioBox radio={radio} show={show} handleClick={handleClick} />
        }
    </div>
  )
}

export default RadioCard
