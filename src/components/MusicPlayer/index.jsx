import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNowPlaying } from '../../redux/features/playerSlice';

import { next, prev, play, pause, onShuffle, offShuffle, onRepeat, offRepeat, playSongs } from '../../functions/player';

import NowPlaying from './NowPlaying';
import Player from './Player'
import MiniPlayer from './MiniPlayer';

const MusicPlayer = ({ scrolled }) => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, shuffle, repeat, nowPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const dispatch = useDispatch();

  const handleClick = () => {
    const arg = !(nowPlaying)
    dispatch(setNowPlaying(arg))
  }

  return (
    <>
    <Player
      activeSong={activeSong}
      volume={volume}
      isPlaying={isPlaying}
      seekTime={seekTime}
      currentIndex={currentIndex}
      onEnded={() => next(dispatch, currentIndex + 1)}
      onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
      onLoadedData={(event) => setDuration(event.target.duration)}
    />

    <MiniPlayer 
      dispatch={dispatch} 
      isPlaying={isPlaying}
      currentSongs={currentSongs}
      activeSong={activeSong}
      isActive={isActive}
      currentIndex={currentIndex}
      seekTime={seekTime}
      nowPlaying={nowPlaying}
      handleClick={handleClick}
      next={next}
      prev={prev}
      pause={pause}
      play={play}
      scrolled={scrolled}
      duration={duration}
      appTime={appTime}
    />   
    
    <NowPlaying 
      dispatch={dispatch}
      handleClick={handleClick}
      playSongs={playSongs}
      play={play}
      pause={pause}
      next={next}
      prev={prev}
      onShuffle={onShuffle}
      offShuffle={offShuffle}
      onRepeat={onRepeat}
      offRepeat={offRepeat}
      nowPlaying={nowPlaying}
      activeSong={activeSong}
      currentSongs={currentSongs}
      currentIndex={currentIndex}
      isPlaying={isPlaying}
      shuffle={shuffle}
      repeat={repeat}
      duration={duration}
      volume={volume}
      setVolume={setVolume}
      setSeekTime={setSeekTime}
      appTime={appTime}
    />
    </>
  );
};

export default MusicPlayer;
