import { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useSearchParams } from 'react-router-dom';
import {
  ArtistDetails,
  Discover,
  Search,
  SongDetails,
  TopCharts,
  AlbumDetails,
  Genres,
  Playlist,
  GenreDetails,
  PlaylistDetails,
  Favorites,
  Blacklist
} from './pages';
import Details from './components/Details';
import { setPlayer } from './redux/features/playerSlice';
import { setLibrary } from './redux/features/librarySlice';
import Layout from './Layout';
import PleaseHelpMessage from './components/PleaseHelpMessage';

import { checkIfVisitorHasToken } from './utils/token';
import { recordVisitor } from './utils/db';

const App = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [userIsValidated, setUserIsValidated] = useState(false);

  useLayoutEffect(() => {
    recordVisitor(searchParams);

    const playerStorage = localStorage.getItem('player');
    const libraryStorage = localStorage.getItem('library');
    if (playerStorage) dispatch(setPlayer(JSON.parse(playerStorage)));
    if (libraryStorage) dispatch(setLibrary(JSON.parse(libraryStorage)));

    const visitorHasToken = checkIfVisitorHasToken();
    setUserIsValidated(visitorHasToken);
  }, []);

  if(!userIsValidated) return <PleaseHelpMessage setUserIsValidated={setUserIsValidated} />;

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/charts" element={<TopCharts />} />
        <Route path="/*" element={<Discover />} />
        <Route element={<Details />}>
          <Route path="/artists/:id" element={<ArtistDetails />} />
          <Route path="/albums/:id" element={<AlbumDetails />} />
          <Route path="/songs/:songid" element={<SongDetails />} />
        </Route>
        <Route path="/search/:searchTerm" element={<Search />} />

        <Route path="/genres/" element={<Genres />} />
        <Route path="/genres/:id" element={<GenreDetails />} />
                  
        <Route path="/playlists/" element={<Playlist />} />
        <Route path="/playlists/:id" element={<PlaylistDetails />} />

        <Route path="/favorites" element={<Favorites />} />
        <Route path="/blacklist" element={<Blacklist />} />
      </Route>
    </Routes>
  );
};

export default App;
