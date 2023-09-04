import { useContext, useMemo } from 'react'
import { DetailsContext } from './Details'
import { PlayButton, ShuffleButton, FavoriteButton, PauseButton, PlayNextButton } from './Buttons'
import { Options } from './Options'
import { useSelector } from 'react-redux'

const Actions = () => {
    const { isFetching, error, data } = useContext(DetailsContext)
    const { activeSong, isPlaying } = useSelector(state => state.player)
 
    if (!data?.id) return;

    return (
        <div className="relative z-[0] flex flex-col lg:flex-row flex-wrap justify-between items-start lg:items-center gap-3 p-4">
            <div className="flex-1 flex flex-row items-center justify-start gap-4">
                {
                    !(isFetching || error) &&
                    <>
                        {
                            data.type == 'track' && isPlaying && activeSong.id == data.id ?
                                <PauseButton /> : 
                                <PlayButton album={data} tracks={data?.tracks} song={data?.song} i={0} /> 
                        }
                        {
                            data.type != 'track' ?
                                <ShuffleButton album={data} tracks={data?.tracks} /> :
                                <PlayNextButton tracks={data?.tracks} />
                        }
                    </>
                }
            </div>
                
            <div className="flex-1 flex flex-row justify-end items-center gap-4 overflow-x-clip">
                <FavoriteButton data={data} type={data.type + 's'} />
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
