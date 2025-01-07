import React,{useMemo, useState} from 'react'
import './Cart.scss'
import PinDropIcon from '@mui/icons-material/PinDrop';
import cartImg from '../../Assest/Image.png'
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import Login from '../Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { bookImg } from '../../Utils/bookImg';
import { getCartItemRemoveApi, orderAPI, UpdateCartItemApi } from '../../Utils/Api';
import {assignCartIntoList, assignOrderList, removeBookFromCartList} from '../../Utils/store/cartSlice'
const Cart = () => {

    const [cardItem,setCardItem]=useState(1)
    const [showAddress,setShowAddress]=useState(false)
    const [showOrder,setShowOrder]=useState(false)
    const [openModel,setOpenModel]=useState(false)
    const [showOrderPlaceBtn,setShowOrderplaceBtn]=useState(true)
    const [showContinueBtn,setShowContinueBtn]=useState(true)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cartData=useSelector((store) => store.cart.cartList);
    
    console.log(cartData);
    
    // const handleIncreaseCard=()=>{
    //     setCardItem((prev)=>prev+1)
    // }
    // const handleDecreaseCard=()=>{
    //     setCardItem((prev)=>(prev > 1 ? prev - 1 : 1))
    // }
    const handlePlaceOrder=()=>{
        if(localStorage.getItem('bookStore-token')){
            setShowAddress(!showAddress)
            setShowOrderplaceBtn(!showOrderPlaceBtn)
        }
        else{
            handleModel()
            // setShowAddress((prev)=>!prev)
        }
    }

    const handleClick=(action,bookId)=>{
        if(action === 'removeCartItem'){
            if(localStorage.getItem('bookStore-token')){
                dispatch(removeBookFromCartList(bookId))
                getCartItemRemoveApi(`bookstore_user/remove_cart_item/${bookId}`)
                .then((result)=>{
                    const {data}=result
                    console.log(data);
                })
                .catch((error)=>{
                    console.log(error);
                    
                })
            }
            else{
                dispatch(removeBookFromCartList(bookId))
            }
            
        }
        if(action==='updateIncQuantity'){
            if (localStorage.getItem('bookStore-token')) {
                const updatedQuantity = cartData.find((item) => item._id === bookId)?.quantityToBuy + 1;
                const payload = {
                    cartItem_id: bookId,
                    quantityToBuy: updatedQuantity,
                };
                
                // Call API to update the quantity
                UpdateCartItemApi(`bookstore_user/cart_item_quantity/${payload.cartItem_id}`, {quantityToBuy:payload.quantityToBuy})
                    .then((result) => {
                        const { data } = result;
                        console.log(data);
                        // Optionally update the state if the API call succeeds
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
            
            // Dispatch action to update the quantity in the Redux store
            dispatch(assignCartIntoList(
                cartData.map((item) =>
                    item._id === bookId
                        ? { ...item, quantityToBuy: item.quantityToBuy + 1 }
                        : item
                )
            ));
        
        }
        if(action==='updateDecQuantity'){
            const currentQuantity = cartData.find((item) => item._id === bookId)?.quantityToBuy;
            if (currentQuantity > 1) {
                if (localStorage.getItem('bookStore-token')) {
                    const updatedQuantity = currentQuantity - 1;
                    const payload = {
                        cartItem_id: bookId,
                        quantityToBuy: updatedQuantity,
                    };

                    // Call API to update the quantity
                    //UpdateCartItemApi(`bookstore_user/cart_item_quantity/${cartItem._id}`,{quantityToBuy:quantity})
                    UpdateCartItemApi(`bookstore_user/cart_item_quantity/${payload.cartItem_id}`, {quantityToBuy:payload.quantityToBuy})
                        .then((result) => {
                            const { data } = result;
                            console.log(data);
                            // Optionally update the state if the API call succeeds
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
                
                // Dispatch action to update the quantity in the Redux store
                dispatch(assignCartIntoList(
                    cartData.map((item) =>
                        item._id === bookId
                            ? { ...item, quantityToBuy: item.quantityToBuy - 1 }
                            : item
                    )
                ));
            } else {
                console.log("Quantity cannot be less than 1");
            }
        } 
        
    }

    const handleAddress=()=>{
        setShowOrder(!showOrder)
        setShowContinueBtn(!showContinueBtn)

    }
    const removeAllCartItem=()=>{
        dispatch(assignOrderList(cartData))
        dispatch(assignCartIntoList([]))
        console.log(cartData);
        
        cartData.map((cart)=>{
            const id=cart._id
            getCartItemRemoveApi(`bookstore_user/remove_cart_item/${id}`)
            .then((result)=>{
                const {data}=result
                console.log(data);
            })
            .catch((error)=>{
                console.log(error);
                
            })
            console.log(id);    
        })
    }
    const handleCheckout=()=>{
        
        const orders=[]
        cartData.forEach((cart)=>{
            orders.push({
                "product_id": cart.product_id._id,
                "product_name": cart.product_id.bookName,
                "product_quantity":cart.quantityToBuy,
                "product_price": cart.product_id.discountPrice
            })
        })
        orderAPI('bookstore_user/add/order',{"orders":orders})
        .then((result)=>{
            const {data}=result
            console.log(data);
            removeAllCartItem()
            navigate('/orderSummary')
        })
        .catch((error)=>{
            console.log(error);
            
        })
       console.log(orders);
       
        
    }
    const handleOpenModel = () => setOpenModel(!openModel);
    
    const handleModel=()=>{
        handleOpenModel()
    }
    
    const randomIndex= ()=>{
        return Math.floor(Math.random() * 18);
    }
    const cartPrice=()=>{
        let totalPrice=0;
        cartData.forEach((cart)=>{
            totalPrice+=(cart.product_id.discountPrice*cart.quantityToBuy)
        })
        return totalPrice
    }
    
    
  return (
    <div className='cart-cnt'>
        <div style={{marginBottom:"20px",color:'#9D9D9D', cursor:"pointer"}}><span onClick={()=>navigate("/")}>Home</span> / <span style={{color:"black"}}>My Cart</span></div>
        <div className='mycart-cnt'>
            <div className='mycart-cartno-cnt'>
                <h3>My Cart ({cartData.length})</h3>
                <select name="" id="" >
                    <option value="" disabled> Location</option>
                    <option value=""><PinDropIcon/>BridgeLabz Solutions LLP, No...</option>
                    <option value="">use current location1</option>
                </select>  
            </div>  
            <div className='cart-details-cnt'>
            {
                cartData.map((cart,index)=>{
                    
                    return <div className='cart-item-cnt' key={index}>
                        <div className='cart-img-cnt'>
                            <img src={bookImg[randomIndex()]} alt="bookimg" />
                        </div>
                        <div>
                            <span>{cart?.product_id?.bookName}</span>
                            <br />
                            <span id='author'>{cart?.product_id?.author}</span>
                            <h4>Rs. {cart?.product_id?.discountPrice}</h4>
                            <div className='cart-button-cnt'>
                            <div className='cart-button'>
                                <button onClick={()=>handleClick("updateDecQuantity",cart?._id)}>-</button>
                                    <span>{cart?.quantityToBuy}</span>
                                <button onClick={()=>handleClick("updateIncQuantity",cart?._id)}>+</button>
                            </div>
                                <button onClick={()=>handleClick("removeCartItem",cart?._id)}>Remove</button>
                            </div>
                        </div>
                    </div>
                })
            }  
            <div className='cart-details-div'>
            {showOrderPlaceBtn && cartData.length !==0 && <button className='cart-details-btn' onClick={handlePlaceOrder}>PLACE ORDER</button>}
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
                          {showContinueBtn && <button className='cart-details-btn' onClick={handleAddress}>CONTINUE</button>}
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
                    {/* map */}
                    {
                        cartData.map((book,index)=>{
                            return <div className='cart-item-cnt' key={index}>
                                        <div className='cart-img-cnt'>
                                            <img src={bookImg[randomIndex()]} alt="bookimg" />
                                        </div>
                                        <div>
                                            <span>{book.product_id.bookName}/</span>
                                            <br />
                                            <span id='author'>{book.product_id.author}</span>
                                            <h4>Rs. {book.product_id.discountPrice}</h4>
                                        </div>
                                    </div>
                        })
                    }

                    {/* ---------- */}
                    <div class="price-details">
                        <h2>CART PRICE DETAILS</h2>
                        <div class="row">
                            <span>Price ({cartData.length} items)</span>
                            <span class="price">₹{cartPrice()}</span>
                        </div>
                        
                        <div class="row">
                            <span>Delivery Charges</span>
                            <span class="delivery">₹40</span>
                            <span class="discount">Free</span>
                        </div>
                        <div class="row total">
                            <span>Total Amount</span>
                            <span class="price">₹{cartPrice()}</span>
                        </div>
                        <div class="savings">
                            You will save ₹40 on this order
                        </div>
                    </div>
                    {/* ----------- */}

                    
                    <div className='cart-details-div'>
                        <button className='cart-details-btn' onClick={handleCheckout}>CHECKOUT</button>
                    </div>
                </div>
            }
        </div>

        
        <Modal
            open={openModel}
            onClose={()=> setOpenModel(!openModel)}
        >
        <Login handleOpenModel={handleOpenModel}/>
        </Modal>

    </div>
  )
}

export default Cart