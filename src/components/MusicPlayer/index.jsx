import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setNowPlaying } from '../../redux/features/playerSlice';

import { next } from '../../utils/player';

import NowPlaying from './NowPlaying';
import Player from './Player'
import MiniPlayer from './MiniPlayer';

const MusicPlayer = ({ scrolled, forMobile = false }) => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, shuffle, repeat, nowPlaying } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const dispatch = useDispatch();

  const open = () => {
    dispatch(setNowPlaying(true));
  }

  function close() {
    dispatch(setNowPlaying(false));
  }

  if (!forMobile && !(activeSong?.id && window.innerWidth >= 1024)) return;
  if (forMobile && !(activeSong?.title && window.innerWidth < 1024)) return;

  return (
    <>
      <Player
        activeSong={activeSong}
        volume={volume}
        isPlaying={isPlaying}
        seekTime={seekTime}
        currentIndex={currentIndex}
        onEnded={() => next(currentIndex + 1)}
        onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
        onLoadedData={(event) => setDuration(event.target.duration)}
      />

      <MiniPlayer
        isPlaying={isPlaying}
        currentSongs={currentSongs}
        activeSong={activeSong}
        isActive={isActive}
        currentIndex={currentIndex}
        seekTime={seekTime}
        nowPlaying={nowPlaying}
        open={open}
        scrolled={scrolled}
        duration={duration}
        appTime={appTime}
      />
    
      <NowPlaying
        close={close}
        open={open}
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
