import React from 'react'
import './MyOrder.scss'
import cartImg from '../../Assest/Image.png'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const MyOrder = () => {

    const orderList=useSelector((store) => store.cart.orderList);
    console.log("orderList",orderList);
    const navigate=useNavigate()
    const todayDate=()=>{
        const today = new Date();
        const monthName = today.toLocaleString('default', { month: 'short' });
        const day = today.getDate();
        const formattedDate = `${monthName} ${day}`;
        return formattedDate
    }
    

  return (
    <div className='myOrder-cnt'>
        <div style={{marginBottom:"20px",color:'#9D9D9D', cursor:"pointer"}}><span onClick={()=>navigate("/")}>Home</span> / <span style={{color:"black"}}>My Order</span></div>
       {
         orderList.map((order)=>{
            return <div className='myOrder-all-items-cnt'>
                <div className='myOrder-item-cnt'>
                    <div className='myOrder-img-cnt'>
                        <img src={cartImg} alt="bookimg" />
                    </div>
                    <div>
                        <span>{order.product_id.bookName}</span>
                        <br />
                        <span id='author'>{order.product_id.author}</span>
                        <h4>Rs. {order.product_id.discountPrice}</h4>
                    </div>
                </div>
                <div className='myOrder-delevery-cnt'> 
                <span className='green-cnt'></span>
                <span className='place-order'>Order Placed on {todayDate()}</span>
                </div>
            </div>
         })
       } 
        
             
            {/* <div className='myOrder-all-items-cnt'>
                <div className='myOrder-item-cnt'>
                    <div className='myOrder-img-cnt'>
                        <img src={cartImg} alt="bookimg" />
                    </div>
                    <div>
                        <span>Don't Make Me Think</span>
                        <br />
                        <span id='author'>by Steve Krug</span>
                        <h4>Rs. 1500</h4>
                    </div>
                </div>
                <div className='myOrder-delevery-cnt'> 
                  <span className='green-cnt'></span>
                  <span className='place-order'>Order Placed on May 21</span>
                </div>
            </div>

            <div className='myOrder-all-items-cnt'>
                <div className='myOrder-item-cnt'>
                    <div className='myOrder-img-cnt'>
                        <img src={cartImg} alt="bookimg" />
                    </div>
                    <div>
                        <span>Don't Make Me Think</span>
                        <br />
                        <span id='author'>by Steve Krug</span>
                        <h4>Rs. 1500</h4>
                    </div>
                </div>
                <div className='myOrder-delevery-cnt'> 
                  <span className='green-cnt'></span>
                  <span className='place-order'>Order Placed on May 21</span>
                </div>
            </div> */}
    </div>
  )
}

export default MyOrder