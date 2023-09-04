import { BsDot } from 'react-icons/bs'
import Contributors from './Contributors'
import AlbumInfo from './AlbumInfo'
import SongInfo from './SongInfo'
import Header from './Header'
import GenresAndLink from './GenresAndLink'
import { HeaderLoading, Error } from '../../LoadersAndError'
import { useContext, useEffect, useRef, useState } from 'react'
import ColorThief from 'colorthief'
import { DetailsContext } from '../../Details'

const DetailsHeader = () => {
  const { data, isFetching, error, updateData, ...others } = useContext(DetailsContext)
  const [[bg, text], setColors] = useState(['', '', ''])
  const [url, setUrl] = useState('')

  const imageRef = useRef()

  const onLoad = () => {
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(imageRef.current).slice(0,2)
    if (colors.length !== 2) return;
    const newColors = colors.map(([r, g, b]) => `rgba(${r}, ${g}, ${b})`)
    setColors(newColors)
    updateData({ ...others, colors: isFetching || error ? [] : newColors, data, isFetching, error })
  }

  useEffect(() => {
    setUrl(isFetching ? '' : data?.picture_xl || data?.cover_xl || data?.album?.cover_xl)
  }, [isFetching, data])

  return (
    <div
      className="transition-[box-shadow] relative md:h-[60vh] w-full aspect-square md:aspect-auto flex flex-col justify-end mt-[-60px] overflow-clip"
    >
      <img crossOrigin='anonymous' ref={imageRef} onLoad={onLoad} src={url} alt="" className="absolute top-0 left-0 w-full h-full object-cover" />
      {bg && <div style={{ background: `linear-gradient(transparent 30%, ${bg} 70%)`}} className="absolute bottom-[-50px] left-[-50%] block w-[200%] h-full blur-xl"></div>}
      {
        isFetching ?
        <HeaderLoading /> :
        error ?
        <Error title="Could not load details" /> :
        <>
              <Header text={text} title={data?.title || data?.name} type={data?.type} />
        <div className="mx-4 flex flex-row flex-wrap gap-y-2 items-center relative mb-2 ">
          <Contributors text={text} contributors={data.contributors || []} />
          
          <h3 style={{ color: text }} className="font-bold w-fit flex flex-row items-center text-xs">
            <AlbumInfo data={data} />
            <BsDot size={20} />
            <SongInfo data={data} />
          </h3>
        </div>
              <GenresAndLink bg={bg} text={text} data={data} />
        </>
      }
    </div>
  )
}
  
export default DetailsHeader;