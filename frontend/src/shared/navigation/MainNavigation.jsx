import { Link } from 'react-router-dom';
import MainHeader from './MainHeader';

import { useState } from 'react';
import './MainNavigation.css';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';

const MainNavigation = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerOpen(true);
  }

  const closeDrawerHandler = () => {
    setDrawerOpen(false);
  }

  return (
    <>
      <SideDrawer show={isDrawerOpen} onClick={closeDrawerHandler}>
        <nav className='main-navigation__drawer-nav'>
          <NavLinks />
        </nav> 
      </SideDrawer>
      <MainHeader>
        <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className='main-navigation__title'>
          <Link to="/">Items</Link>
        </h1>
        <nav className='main-navigation__header-nav'>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  )
}

export default MainNavigation;