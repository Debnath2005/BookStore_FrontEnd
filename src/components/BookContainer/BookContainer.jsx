import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard'
import './BookContainer.scss'
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux'
import { Pagination } from '@mui/material'
import { getAllBooks } from '../../Utils/Api'
import { useNavigate, useParams } from 'react-router-dom'


const BookContainer = () => {
const [books,setBooks]=useState([])
const [currentPage, setCurrentPage] = useState(1);
const navigate=useNavigate()
 const allBook = useSelector((store) => store.books.booksList);
 if (allBook.length > 0) {
  console.log(allBook);
}
 const quary=useSelector((store)=>store.querySearch.querySearchString || '')
  const {pageNo}=useParams()
 const handleChange=(e,page)=>{
    setCurrentPage(page)
    navigate(`/books/${page}`)
 }
 useEffect(()=>{
  const pageNum=Number(pageNo)
   setCurrentPage(pageNum)
   console.log(pageNum);
 },[])

 const sortBook=(value)=>{
   const target=value.target.value;
  
    if(target==='Price:Low to High'){
      setBooks([...books].sort((a, b) => a.discountPrice - b.discountPrice));
    }
    else if(target==='Price:High to low'){
      setBooks([...books].sort((a, b) => b.discountPrice - a.discountPrice));
    }
    else{
      setBooks(books)
    }
 }
 const searchQuaryBook=()=>{
  setBooks( books?.filter((book) => {
    const filteredNameData=book.bookName.toLowerCase().includes(quary.toLowerCase())
    //const filteredPriceData = book.discountPrice.toString().includes(quary);

    const filteredPriceData = !isNaN(quary) && book.discountPrice >= quary - 50 &&  book.discountPrice <= quary + 50;

    return filteredNameData || filteredPriceData;
  }) ) ;
}
 useEffect(()=>{
   if(quary===''){
      getAllBooks('bookstore_user/get/book')
          .then((res=>{
            const {data}=res
            console.log(data);
            //setBooks(sortBook())
            setBooks(data?.result)
          }))
   }
   else{
    searchQuaryBook()
   }
 },[quary])

 const paginateBooks = () => {
  const indexOfLastBook = currentPage * 10;
  const indexOfFirstBook = indexOfLastBook - 10;
  return books.slice(indexOfFirstBook, indexOfLastBook);
};
 
  return (
    <div className='bookContainer-cnt'>
      <div className='bookContainer-sort-cnt'>
        <h2>Books <span style={{color:'#9D9D9D',fontSize:'12px'}}>({books.length} items)</span></h2>
        <select name="" id="" onClick={(event)=>sortBook(event)}>
          <option value="" disabled selected>Sort by relevance</option>
          <option value="Price:Low to High" onClick={()=>console.log("hi")
          }>Price:Low to High</option>
          <option value="Price:High to low"  onClick={()=>sortBook("Price:High to low")}>Price:High to low</option>
          {/* <option value="">Newest Arrivals</option> */}
        </select>
      </div>
      <div className='bookContainer-bookItem-cnt'>
        {
          allBook.length===0 ? Array.from({ length: 10 }).map((_, index) => (
            <Loader key={index} />
          ))
          :
          
          //  books.length !==0 ?
            paginateBooks().map((book,index)=>{
              return  <BookCard key={index} bookItem={book}/>
            })
            // :
            // <h1 style={{display:'flex',alignItems:'center',justifyContent:'center'}}>No Books Found</h1>
            
        }
      </div>

        {
          books.length !==0 && <div className='pagination-cnt'>
              <Pagination count={Math.ceil(books.length / 10)} color="primary" page={currentPage} onChange={handleChange}/> 
          </div>
        }

    </div>
    
  )
}

export default BookContainer