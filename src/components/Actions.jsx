import { useContext, useMemo } from 'react'
import { DetailsContext } from './Details'
import { PlayButton, ShuffleButton, FavoriteButton, PauseButton, PlayNextButton } from './Buttons'
import { Options } from './Options'
import { useSelector } from 'react-redux'

const Actions = () => {
    const { isFetching, error, data, colors } = useContext(DetailsContext)
    const { activeSong, isPlaying } = useSelector(state => state.player)
    const [bg, text] = useMemo( () => colors || [], [colors] )
 
    if (!data?.id) return;

    return (
        <div className="relative z-[0] flex lg:flex-row justify-between items-start lg:items-center gap-3 p-4">
            <div className="flex-1 flex flex-row items-center justify-start gap-4">
                {
                    !(isFetching || error) &&
                    <>
                        {
                            data.type == 'track' && isPlaying && activeSong.id == data.id ?
                                <PauseButton bg={text} text={bg} /> : 
                                <PlayButton bg={text} text={bg} album={data} tracks={data?.tracks} song={data?.song} i={0} /> 
                        }
                        {
                            data.type != 'track' ?
                                <ShuffleButton bg={bg} text={text} album={data} tracks={data?.tracks} /> :
                                <PlayNextButton bg={bg} text={text} tracks={data?.tracks} />
                        }
                    </>
                }
            </div>
                
            <div className="flex-1 flex flex-row justify-end items-center gap-4">
                <FavoriteButton text={text} data={data} type={data.type + 's'} />
                <Options 
                    type={data.type || 'track'} 
                    favorite={data?.favorite} 
                    blacklist={data?.blacklist}
                    album={ data?.type == 'album' ? data : data?.album } 
                    tracks={ data?.tracks || [] } 
                    song={ data?.song || {} } 
                    artist={ data?.artist || {} } 
                    i={0} 
                />
            </div>
        </div>
    )
}

export default Actions
