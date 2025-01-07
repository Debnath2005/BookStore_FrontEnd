import React,{useEffect, useState} from 'react'
import './Header.scss'
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';

import logo from '../../Assest/logo.png'
import { useNavigate } from 'react-router-dom';
import { getAllBooks, getCartItemApi, getWishlistApi } from '../../Utils/Api';
import { assignBookIntoList } from '../../Utils/store/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login/Login';
// import bookStore from '../../Utils/store/bookStore';
import reducer, { assignAddressList, assignCartIntoList, assignUserDetails } from '../../Utils/store/cartSlice';
import { assingBooksIntoWishList } from '../../Utils/store/wishlistbooksSlice';
import { assingWordsIntoQuerySearch } from '../../Utils/store/quarySearchSlice';
const Header = () => {
  const navigate=useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModel,setOpenModel]=useState(false)
  const open = Boolean(anchorEl);
  const cartData=useSelector((store) => store.cart.cartList);
  const userData=useSelector((store)=> store.cart.userDetails)
  
  const dispatch=useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // console.log(userData)
  // localStorage.setItem('firstName',cartData[0]?.user_id?.fullName.split(" ")[0])
  const handleClose=(action)=>{
    setAnchorEl(null)
    if(action==='order'){
      navigate('/myOrder')
    }
    if(action==='wishlist'){
      navigate('/wishlist')
    }
    if(action==='login'){
      handleModel()
    }
    if(action==='profile'){
      navigate('/myProfile')
    }
    if(action==='logout'){
      localStorage.clear('bookStore-token')
      localStorage.clear('firstName')
    }
  }
  const handleModel=()=>{
    handleClose()
    handleOpenModel()
  }
  const handleOpenModel = () => setOpenModel(!openModel);
  // const handleCloseModel = () => setOpenModel(false);

  useEffect(()=>{
    fetchData()
    if(localStorage.getItem('bookStore-token')){
      fetchCartApi()
      fetchWishlistApi()
    }
  },[])
  
  const fetchCartApi= async()=>{
    getCartItemApi('bookstore_user/get_cart_items')
    .then((result)=>{
    const {data}=result
    
     dispatch(assignCartIntoList(data.result))
     dispatch(assignUserDetails(data.result[0].user_id.fullName))
     dispatch(assignAddressList(data.result[0].user_id))
    //  console.log(data.result[0].user_id.fullName);
     // console.log(data.result[0].user_id);
    })
    .catch((error)=>{
    console.log(error);
    })
  }

  const fetchWishlistApi =async()=>{
    getWishlistApi('/bookstore_user/get_wishlist_items')
      .then((result)=>{
          const {data}=result
          //console.log(data.result);
          dispatch(assingBooksIntoWishList(data?.result))
        })
      .catch((error)=>{
          console.log(error);
      })
  }

  const fetchData= async()=>{
    getAllBooks('bookstore_user/get/book')
    .then((result=>{
      const {data}=result
      // setAllBook(data?.result)
      dispatch(assignBookIntoList(data?.result))
     // console.log(data?.result);
    }))
  }


  return (
    <div className='header-cnt'>
        <div className='header-main-cnt'>
            <div className='header-main-item1-cnt'>
                <div className='header-main-logo-cnt' onClick={()=>navigate('')}>
                  <img src={logo} alt="logo" />
                  <span>Bookstore</span> 
                </div>
                <div className='header-main-search-cnt'>
                    <SearchIcon/>
                    <input type="text" placeholder='Search...' onChange={(e)=>{dispatch(assingWordsIntoQuerySearch(e.target.value))}} /> 
                </div>
            </div>
            <div className='header-main-item2-cnt'>
                <div className='header-profile-cnt' onClick={handleClick}>
                  <Person2OutlinedIcon/>
                  {
                    localStorage.getItem('bookStore-token')?
                   // <span>{cartData[0]?.user_id?.fullName.split(" ")[0]}</span>
                   <span>{userData}</span>
                    :
                    <span>Profile</span>
                  }
                </div>
                <div className='header-profile-cnt' onClick={()=>navigate('/cart')}>
                {/* <Badge>
                  <Typography sx={{ fontSize: 'xl' }}><ShoppingCartOutlinedIcon/></Typography>
                </Badge> */}
                    <Badge badgeContent={cartData.length} color="primary">
                      <ShoppingCartOutlinedIcon/>
                    </Badge>  
                    <span>Cart</span>
                </div>
            </div>
        </div>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className='menu-cnt'>
        { localStorage.getItem('bookStore-token') ?

          <div className='menu-logout-cnt logout-width'>
              <div className='menu-logout-welcome'>
                <span>Hello {userData},</span>
              </div>
              <div className='menu-myOrder' onClick={()=>handleClose('profile')}>
                <Person2OutlinedIcon className='icon'/>
                <div>
                    Profile
                </div>
              </div>
              <div className='menu-myOrder' onClick={()=>handleClose('order')}>
                <ShoppingBagOutlinedIcon className='icon'/>
                <div>My order</div>
              </div>
              <div className='menu-wishlist' onClick={()=>handleClose('wishlist')}>
                <FavoriteBorderOutlinedIcon className='icon'/>
                <div>Wishlist</div>
              </div>
              <button onClick={()=>handleClose('logout')}>LOGOUT</button>
          </div>
            :
            <div className="menu-logout-cnt">
              <div className='menu-logout-welcome'>
                <span>Welcome</span>
                <p>To acsess account and manage orders</p>
              </div>
              <button onClick={()=>handleClose('login')}>LOGIN/SIGNUP</button>
              <Divider />
              <div className='menu-myOrder' onClick={()=>handleClose('order')}>
                <ShoppingBagOutlinedIcon className='icon'/>
                <div>My order</div>
              </div>
              <div className='menu-wishlist' onClick={()=>handleClose('wishlist')}>
                <FavoriteBorderOutlinedIcon className='icon'/>
                <div>Wishlist</div>
              </div>
          </div> 
        }
        </div>
        
      </Menu>

      <Modal
        open={openModel}
        onClose={()=> setOpenModel(!openModel)}
      >
        <Login handleOpenModel={handleOpenModel}/>
      </Modal>

    </div>
  )
}

export default Header