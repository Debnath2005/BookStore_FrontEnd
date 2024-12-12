import React,{useState} from 'react'
import './Cart.scss'
import PinDropIcon from '@mui/icons-material/PinDrop';
import cartImg from '../../Assest/Image.png'
const Cart = () => {

    const [cardItem,setCardItem]=useState(1)
    const [showAddress,setShowAddress]=useState(false)
    const [showOrder,setShowOrder]=useState(false)

    const handleIncreaseCard=()=>{
        setCardItem((prev)=>prev+1)
    }
    const handleDecreaseCard=()=>{
        setCardItem((prev)=>(prev > 1 ? prev - 1 : 1))
    }
    const handlePlaceOrder=()=>{
        setShowAddress(!showAddress)
    }
    const handleAddress=()=>{
        setShowOrder(!showOrder)
    }
  return (
    <div className='cart-cnt'>
        <div className='mycart-cnt'>
            <div className='mycart-cartno-cnt'>
                <h3>My Cart (1)</h3>
                <select name="" id="" >
                    <option value="" disabled> location</option>
                    <option value=""><PinDropIcon/>use current location1</option>
                    <option value="">use current location1</option>
                </select>  
            </div>  
            <div className='cart-details-cnt'>
                <div className='cart-item-cnt'>
                    <div className='cart-img-cnt'>
                        <img src={cartImg} alt="bookimg" />
                    </div>
                    <div>
                        <span>Don't Make Me Think</span>
                        <br />
                        <span id='author'>by Steve Krug</span>
                        <h4>Rs. 1500</h4>
                        <div className='cart-button-cnt'>
                        <div className='cart-button'>
                            <button onClick={handleDecreaseCard}>-</button>
                                <span>{cardItem}</span>
                            <button onClick={handleIncreaseCard}>+</button>
                        </div>
                            <button>Remove</button>
                        </div>
                    </div>
                </div>
                
                <div className='cart-details-div'>
                    <button className='cart-details-btn' onClick={handlePlaceOrder}>PLACE ORDER</button>
                </div>
                    
            </div>   
        </div>
        <div className='address-cnt'>
                {
                    showAddress === false ?
                    <div className='address-false-cnt'>
                        <span>Address Details </span>
                    </div>
                    :
                    <div className='address-true-cnt'>
                        <div>
                            <h3>Customer Details</h3>
                        </div>
                        <div className='address-details'>
                            <div className="address-name-cnt">
                                <div className='address-fname-cnt'>
                                    <div>Full Name</div>
                                    <div className='address-input-div-cnt'>Debnath Mondal</div>
                                </div>
                                <div className="mobile">
                                    <div>Mobile Number</div>
                                    <div className='address-input-div-cnt'>6206845987</div>
                                </div>
                            </div>
                            <div className='address-fulladdress-cnt'>
                                <div>Address</div>
                                <div className='address-fulladdress-input-cnt'>
                                  BridgeLabz Solutions LLP, No. 42, 14th Main, 15th Cross, Sector 4, Opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore
                                </div>
                            </div>
                            <div className="address-name-cnt">
                                <div className='address-fname-cnt'>
                                    <div>City/Town</div>
                                    <div className='address-input-div-cnt'>Bangaluru</div>
                                </div>
                                <div className="mobile">
                                    <div>state</div>
                                    <div className='address-input-div-cnt'>karnataka</div>
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
                        <div className='cart-details-div'>
                            <button className='cart-details-btn' onClick={handleAddress}>CONTINUE</button>
                        </div>
                    </div>
                }
        </div>
        <div className='order-cnt'>
            {
                showOrder ===false ?
                <div className='address-false-cnt'>
                    <span>Order Summary </span>
                </div>
                :
                <div className='order-true-cnt'>
                    <div style={{marginBottom:'25px'}}>
                        <h3>Order Summary</h3>
                    </div>
                    <div className='cart-item-cnt'>
                        <div className='cart-img-cnt'>
                            <img src={cartImg} alt="bookimg" />
                        </div>
                        <div>
                            <span>Don't Make Me Think</span>
                            <br />
                            <span id='author'>by Steve Krug</span>
                            <h4>Rs. 1500</h4>
                        </div>
                    </div>
                    <div className='cart-details-div'>
                        <button className='cart-details-btn' onClick={handlePlaceOrder}>CHECKOUT</button>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Cart