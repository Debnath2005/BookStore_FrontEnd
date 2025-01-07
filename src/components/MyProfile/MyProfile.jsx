import React, { useState } from 'react'
import './MyProfile.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const MyProfile = () => {
    // const [fullName,setFullName]=useState("")
    const [editPersonalDetail,setEditPersonalDetail]=useState(false)
    const [editAddressDetail,setEditAddressDetail]=useState(false)

    const userAddress=useSelector((state)=>state.cart.addressDetails)
    console.log(userAddress);
    
    const navigate=useNavigate()
    const handleEdit=()=>{
        setEditPersonalDetail(!editPersonalDetail)
    }
    const handleEditAddress=()=>{
        setEditAddressDetail(!editAddressDetail)
    }
  return (
    <div className='profile-cnt'>
        <div className='profile-weidth-cnt'>
        <div style={{marginBottom:"20px",color:'#9D9D9D', cursor:"pointer"}}><span onClick={()=>navigate("/")}>Home</span> / <span style={{color:"black"}}>My profile</span></div>
            <div className='personal-details-cnt'>
               
               {
                 editPersonalDetail === false ?
                 
                 <div className='profile-false-cnt'>
                    <div className='profile-details-header'>
                        <h3>Personal Details</h3>
                        <button className='profile-edit-btn' onClick={handleEdit}>Edit</button>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Full Name</div>
                            <div className='profile-input-cnt'>{userAddress.fullName}</div>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Email Id</div>
                            <div className='profile-input-cnt'>{userAddress.email}</div>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Password</div>
                            <div className='profile-input-cnt'>***********</div>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Mobile Number</div>
                            <div className='profile-input-cnt'>{userAddress.phone}</div>
                    </div>
                 </div>
                 :
                 <div className='profile-false-cnt'>
                    <div className='profile-details1-header'>
                        <div className='profile-edit-cancle-btn'>
                            <h3>Personal Details</h3>
                            <button onClick={handleEdit}>Cancle</button>
                        </div>
                        <button onClick={handleEdit} className='save-btn'>Save</button>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Full Name</div>
                            <input className='profile-input-cnt' value={"Debnath "}/>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Email Id</div>
                            <input className='profile-input-cnt' value={"mondal.deb1610@gmail.com"}/>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Password</div>
                            <input className='profile-input-cnt' value={"**************"}/>
                    </div>
                    <div className='profile-label-cnt'>
                            <div>Mobile Number</div>
                            <input className='profile-input-cnt' value={"6206845987"}/>
                    </div>
                 </div>
               }
                 
            </div>
            <div className='address-details-cnt'>
                <div >
                    <div className='address-details-header'>
                        <h3>Personal Details</h3>
                        <button>Add New Address</button>
                    </div>
                    
                    
                    {
                        editAddressDetail === false ?
                       <div className='address-false1-cnt'>
                         <div className='profile-details-header'>
                            <h3>1. Work</h3>
                            <button className='profile-edit-btn' onClick={handleEditAddress}>Edit</button>
                        </div>
                        <div className='profile-label-cnt'>
                            <div>Address</div>
                            <div className='address-input-cnt'>BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore</div>
                        </div>
                        <div className='address-city-town-cnt'>
                            <div className='address-city-label-cnt'>
                                <div>City/Town</div>
                                <div className='address-city-input-cnt'>Bangaluru</div>
                            </div>
                            <div className='address-city-label-cnt'>
                                <div>State</div>
                                <div className='address-city-input-cnt'>Karnataka</div>
                            </div>
                        </div>
                        <div className='address-type-cnt'>
                            <div>Type</div>
                            <div className='address-radio-cnt'>
                                <div className='address-radio-btn'>
                                    <input type="radio" name="type" id="" />
                                    <div>Home</div>
                                </div>
                                <div className='address-radio-btn'>
                                    <input type="radio" checked name="type" id="" />
                                    <div>Work</div>
                                </div>
                                <div className='address-radio-btn'>
                                    <input type="radio" name="type" id="" />
                                    <div>Other</div>
                                </div>
                            </div>
                        </div>
                       </div>
                       :
                       <div className='address-false1-cnt'>
                        <div className='profile-details1-header'>
                            <div className='profile-details-header'>
                                <h3>1. Work</h3>
                                <button className='profile-edit-btn' onClick={handleEditAddress}>Cancle</button>
                            </div>
                            <button onClick={handleEditAddress} className='save-btn'>Save</button>
                        </div>
                         
                        <div className='profile-label-cnt'>
                            <div>Address</div>
                            <input className='address-input-cnt' type='text' value={"BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore"} />
                        </div>
                        <div className='address-city-town-cnt'>
                            <div className='address-city-label-cnt'>
                                <div>City/Town</div>
                                <input type='text' className='address-city-input-cnt' value={"Bangaluru"}/>
                            </div>
                            <div className='address-city-label-cnt'>
                                <div>State</div>
                                <input className='address-city-input-cnt' value={"Karnataka"}/>
                            </div>
                        </div>
                        <div className='address-type-cnt'>
                            <div>Type</div>
                            <div className='address-radio-cnt'>
                                <div className='address-radio-btn'>
                                    <input type="radio" name="type" id="" />
                                    <div>Home</div>
                                </div>
                                <div className='address-radio-btn'>
                                    <input type="radio" name="type" id="" />
                                    <div>Work</div>
                                </div>
                                <div className='address-radio-btn'>
                                    <input type="radio" name="type" id="" />
                                    <div>Other</div>
                                </div>
                            </div>
                        </div>
                       </div>
                    }
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default MyProfile