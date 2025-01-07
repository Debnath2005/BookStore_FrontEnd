import React, { useState } from 'react'
import './Login.scss'
import loginImg from '../../Assest/login-img.png' 
import { getCartItemApi, getWishlistApi, loginApi, signUpApi } from '../../Utils/Api'
import { useNavigate } from 'react-router-dom'
import reducer, { assignAddressList, assignCartIntoList, assignUserDetails } from '../../Utils/store/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { assingBooksIntoWishList } from '../../Utils/store/wishlistbooksSlice'
const Login = ({handleOpenModel}) => {
    const [isLogin,setIsLogin]=useState('login')

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    // States for signup form
    const [signupName, setSignupName] = useState('')
    const [signupEmail, setSignupEmail] = useState('')
    const [signupPassword, setSignupPassword] = useState('')
    const [signupPhone, setSignupPhone] = useState('')
    const dispatch=useDispatch()

    const logoutCart=useSelector((store) => store.cart.cartList);

    const handleTogle=(tab)=>{
        setIsLogin(tab)
    }
    const handleLogin=()=>{
        handleOpenModel()
        if(loginEmail && loginPassword){
            loginApi('bookstore_user/login',{email:loginEmail,password:loginPassword})
            .then((result)=>{
                const {data}=result
                localStorage.setItem('bookStore-token',data.result.accessToken)
                console.log(data);
                setLoginEmail("")
                setLoginPassword("")
                allApiCall()
            })
            .catch((error)=>{
                console.log(error);
            })
        }
        
    }

    // const compareCartData=(apiData)=>{
    //     if(apiData.length===0 && logoutCart.length===0){
    //         return;
    //     }
    //     else if(logoutCart.length===0){
    //         dispatch(assignCartIntoList(apiData))
    //         return;
    //     }
    //     else if(apiData.length===0){
    //         logoutCart.map((book)=>{
    //             // Api Call update Cart
    //         })
    //         return;
    //     }
    //     else{
        
    //     }

    // }

    const allApiCall=()=>{
        if(localStorage.getItem('bookStore-token')){
            //cart,wishlist,orderlist
            getCartItemApi('bookstore_user/get_cart_items')
            .then((result)=>{
            const {data}=result
                // compareCartData(data.result)
                dispatch(assignCartIntoList(data.result))
                dispatch(assignUserDetails(data.result[0].user_id.fullName))
                dispatch(assignAddressList(data.result[0].user_id))
                console.log(data.result[0].user_id.fullName);
                
                console.log(data.result);
            })
            .catch((error)=>{
                console.log(error);
            })

            getWishlistApi('/bookstore_user/get_wishlist_items')
            .then((result)=>{
                const {data}=result
                console.log(data);
                dispatch(assingBooksIntoWishList(data?.result))
                
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }
    const handleSignUp=()=>{
        handleOpenModel()
        if(signupName && signupEmail && signupPassword && signupPhone){
            signUpApi('bookstore_user/registration',{fullName:signupName,email:signupEmail,password:signupPassword,phone:signupPhone})
            .then((result)=>{
                const {data}=result
                // localStorage.setItem('firstName',data.result.fullName.split(" ")[0])
                console.log(data);
                setSignupName("")
                setSignupEmail("")
                setSignupPassword("")
                setSignupPhone("")
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }
  return (
    <div className='sign-cnt'>
        <div className="sign-main-cnt">
            <div className='login-img-cnt'>
                <img src={loginImg} alt="loginImg" />
                {/* <h2>ONLINE BOOK SHOPING</h2> */}
            </div>
            <div className='login-main-cnt'>
                <div className='name-cnt'>
                    <h3 onClick={()=>handleTogle('login')} className={isLogin==='login'?'active-login':''}>LOGIN</h3>
                    <h3 onClick={()=>handleTogle('signup')} className={isLogin==='signup'?'active-login':''}>SIGNUP</h3>
                </div>
            { 
              isLogin === 'login' ?
                <div className='login-cnt' >
                    <div className="login-email-cnt">
                        <div>Email Id</div>
                        <input type="text"  placeholder='Email Id...'  value={loginEmail}  onChange={(e) => setLoginEmail(e.target.value)} />
                    </div>
                    <div className="login-password-cnt">
                        <div>Password</div>
                        <input type="password" placeholder='password'  value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                        <div className='forgate-cnt'>Forgate password?</div>
                    </div>
                    <button className='login-button' onClick={handleLogin}>Login</button>
                    <div className='login-space-cnt'>
                        <div className='login-line-cnt'></div>
                        <div>OR</div>
                        <div className='login-line-cnt'></div>
                    </div>
                    <div className='login-social-button'>
                        <button>Facebook</button>
                        <button id='google'>Google</button>
                    </div>
                </div>
                :
                <div className='signup-cnt' >
                    <div className="signup-input-cnt">
                        <div>Full Name</div>
                        <input type="text" placeholder='Full Name' value={signupName}  onChange={(e) => setSignupName(e.target.value)} />
                    </div>
                    <div className="signup-input-cnt">
                        <div>Email id</div>
                        <input type="text" placeholder='Email Id' value={signupEmail}  onChange={(e) => setSignupEmail(e.target.value)}/>
                        {/* <div className='forgate-cnt'>Forgate password?</div> */}
                    </div>
                    <div className="signup-input-cnt">
                        <div>Password</div>
                        <input type="password" placeholder='Password' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}/>
                    </div>
                    <div className="signup-input-cnt">
                        <div>Mobile Number</div>
                        <input type="text" placeholder='Mobile Number' value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)}/>
                    </div>
                    <button onClick={handleSignUp}>Signup</button>
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Login