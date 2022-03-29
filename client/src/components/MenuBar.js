import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {AuthContext} from '../context/auth'

function MenuBar() {
  const {user, logout} = useContext(AuthContext)
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  const[activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => setActiveItem(name);

    const myMenuBar = user ? (
      <Menu pointing secondary size="massive" color="red">
        <Menu.Item
          name={user.username}
          active
          as={Link}
          to="/"
        />
        <Menu.Item
          name='Movie'
          active={activeItem === 'Movie'}
          onClick={handleItemClick}
          as={Link}
          to="/Movie"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='bookings'
            active={activeItem === 'bookings'}
            onClick={handleItemClick}
            as={Link}
            to="/managebookings"
          />
          <Menu.Item
            name='logout'
            active={activeItem === 'login'}
            onClick={logout}
          />
        </Menu.Menu>  
      </Menu>
  ) :
    (
      <Menu pointing secondary size="massive" color="red">
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name='Movie'
          active={activeItem === 'Movie'}
          onClick={handleItemClick}
          as={Link}
          to="/Movie"
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
        </Menu.Menu>
        
      </Menu>
  ); 
    return myMenuBar;
  }

export default MenuBar;