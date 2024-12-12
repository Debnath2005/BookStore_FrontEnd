import React from 'react'
import './Header.scss'
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from '../../Assest/logo.png'
const Header = () => {
  return (
    <div className='header-cnt'>
        <div className='header-main-cnt'>
            <div className='header-main-item1-cnt'>
                <div className='header-main-logo-cnt'>
                  <img src={logo} alt="logo" />
                  <span>Bookstore</span> 
                </div>
                <div className='header-main-search-cnt'>
                    <SearchIcon/>
                    <input type="text" placeholder='Search...' /> 
                </div>
            </div>
            <div className='header-main-item2-cnt'>
                <div className='header-profile-cnt'>
                  <Person2OutlinedIcon/>
                  <span>Profile</span>
                </div>
                <div className='header-profile-cnt'>
                    <ShoppingCartOutlinedIcon/>
                    <span>Cart</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header