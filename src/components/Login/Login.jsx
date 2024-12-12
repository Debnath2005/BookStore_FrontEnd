import React, { useState } from 'react'
import './Login.scss'
import loginImg from '../../Assest/login-img.png' 
const Login = () => {
    const [isLogin,setIsLogin]=useState('login')

    // useEffect(()=>{
    //     console.log("updated");
        
    // },[isLogin])

    const handleTogle=(tab)=>{
        setIsLogin(tab)
    }
  return (
    <div className='sign-cnt'>
        <div className="sign-main-cnt">
            <div className='login-img-cnt'>
                <img src={loginImg} alt="loginImg" />
            </div>
            <div className='login-main-cnt'>
                <div className='name-cnt'>
                    <h3 onClick={()=>handleTogle('login')} className={isLogin==='login'?'active':''}>LOGIN</h3>
                    <h3 onClick={()=>handleTogle('signup')} className={isLogin==='signup'?'active':''}>SIGNUP</h3>
                </div>
            { 
              isLogin === 'login' ?
                <div className='login-cnt' >
                    <div className="login-email-cnt">
                        <div>Email</div>
                        <input type="text"  placeholder='Email...'  id='lMail'/>
                    </div>
                    <div className="login-password-cnt">
                        <div>Password</div>
                        <input type="password" placeholder='password' id='lPass'/>
                        <div className='forgate-cnt'>Forgate password?</div>
                    </div>
                    <button className='login-button'>Login</button>
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
                        <input type="text" placeholder='Full Name' id='fname' />
                    </div>
                    <div className="signup-input-cnt">
                        <div>Email id</div>
                        <input type="text" placeholder='Email Id' id='sMail'/>
                        {/* <div className='forgate-cnt'>Forgate password?</div> */}
                    </div>
                    <div className="signup-input-cnt">
                        <div>Password</div>
                        <input type="password" placeholder='Password' />
                    </div>
                    <div className="signup-input-cnt">
                        <div>Mobile Number</div>
                        <input type="text" placeholder='Mobile Number' />
                    </div>
                    <button>Signup</button>
                </div>
            }
            </div>
        </div>
    </div>
  )
}

export default Login