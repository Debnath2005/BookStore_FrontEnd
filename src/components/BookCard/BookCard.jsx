import React from 'react'
import './BookCard.scss'
import image from '../../Assest/Image.png'
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
const BookCard = () => {
  return (
    <div className='bookcard-cnt'>
        <div className='baokcard-img-cnt'>
            <img src={image} alt="book" />
        </div>
        <div className='bookcard-name-details'>
            <h4>Don't Make Me Think</h4>
            <span>by Steve Krug</span>
            <div className='bookstore-star-cnt'>
                <h4>4.5<StarPurple500OutlinedIcon/> </h4>
                <span>(20)</span>
            </div>
            <h4 id='price'>RS 1500</h4>
        </div>
    </div>
  )
}

export default BookCard