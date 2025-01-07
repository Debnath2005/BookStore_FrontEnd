import React from 'react'
import './OrderSummary.scss'
import summaryImg from '../../Assest/celebrationImg.png'
import { useNavigate } from 'react-router-dom'
const OrderSummary = () => {
    const navigate=useNavigate()

    const handleShopping=()=>{
        navigate('/')
    }
  return (
    <div className='orderSummary'>
        <div className='orderSummary-main-cnt'>
            <img src={summaryImg} alt="Celebration Img" />
            <h2>Order placed successfully</h2>
            <p>hurray!!! your order is confirmed the order id is #123456 save the order id for further communication..</p>
            <div className='orderSummary-table'>
                <div className='orderSummary-header-cnt'>
                    <div>Email Us</div>
                    <div>Contact Us</div>
                    <div>Address</div>
                </div>
                <div className='orderSummary-item-cnt'>
                    <div>admin@bookstore.com</div>
                    <div>+91 8163475881</div>
                    <div>
                        <p id='p'>
                        42, 14th Main, 15th Cross, opp to BDA complex, near Kumarakom restaurant, HSR Layout, Bangalore 560034
                        </p>
                    </div>
                </div>
                
                
            </div>
            <div>
                <button onClick={handleShopping}>CONTINUE SHOPPING</button>
            </div>
        </div>
    </div>
  )
}

export default OrderSummary