import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { Welcome } from './pages';
import { MessageBox, AddToPlaylist, Prompt } from './components/Prompts';
import NavigationAndSearch from './components/NavigationAndSearch';
import MobileNavLinks from './components/Sidebar/MobileNavLinks';
import NavLinks from './components/Sidebar/NavLinks';

const Layout = () => {
    const location = useLocation();

    useEffect(() => {
        if (/show/.test(location.search)) return;
        window.scroll(0, 0);
    }, [location])
    
    return (
        <div className="relative w-full grid grid-cols-1 lg:grid-cols-[300px,1fr] lg:grid-rows-[60px,1fr] bg-[#101010]">
            <NavLinks />
            <NavigationAndSearch />
            <MessageBox />
            <AddToPlaylist />
            <Prompt />
            <Welcome />
            <div className="min-h-[90vh]">
                <Outlet />
            </div>
            <MobileNavLinks />
        </div>
    )
};

export default Layout
