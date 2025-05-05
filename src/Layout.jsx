import React, { useEffect, useMemo, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Welcome } from './pages';
import { MessageBox, AddToPlaylist, Prompt } from './components/Prompts';
import NavigationAndSearch from './components/NavigationAndSearch';
import MobileNavLinks from './components/Sidebar/MobileNavLinks';
import NavLinks from './components/Sidebar/NavLinks';
import PleaseHelpMessage from './components/PleaseHelpMessage';

const Layout = () => {
    const location = useLocation();
    const { nowPlaying } = useSelector((state) => state.player);

    const bodyRef = useRef(null);

    const backgroundColor = useMemo(() => /\/favorite/.test(location.pathname) ?
        'favorites-bg' :
        /\/blacklist/.test(location.pathname) ?
            'blacklist-bg':
        'normal-bg'
    , [location]);

    useEffect(() => {
        if (/show/.test(location.search)) return;
        bodyRef?.current?.scroll(0, 0);
    }, [location])
    
    return (
        <div className={`relative w-full grid grid-cols-1 lg:grid-cols-[300px,1fr] lg:grid-rows-[60px,1fr] p-2 gap-2 ${backgroundColor}`}>
            <PleaseHelpMessage />
            <NavLinks />
            <MessageBox />
            <AddToPlaylist />
            <Prompt />
            <Welcome />
            <div ref={bodyRef} id="main-body" className="pb-[100px] lg:pb-0 lg:border lg:border-white/5 rounded-[15px] lg:h-[calc(100vh-16px)] h-[calc(100vh-16px)] overflow-y-scroll flex flex-col gap-2">
                <NavigationAndSearch />
                <div className={`transition-opacity ${nowPlaying && 'opacity-0'} row-span-2`}>
                    <Outlet />
                </div>
            </div>
            <MobileNavLinks />
        </div>
    )
};

export default Layout
