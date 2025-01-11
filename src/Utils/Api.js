import axios from "axios"

const BASE_URL=`https://bookstore.incubation.bridgelabz.com/`

const getAuth=()=>{
   return `${localStorage.getItem('bookStore-token')}`
}

export const loginApi=async (END_POINT,payload)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const signUpApi=async (END_POINT,payload)=>{
    return await axios.post(`${BASE_URL}${END_POINT}`,payload)
}

export const getAllBooks= async(END_POINT)=>{
    return await axios.get(`${BASE_URL}${END_POINT}`)
}


// CART API CALL

export const AddCartItemApi= async(END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,{},
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

export const getCartItemApi= async(END_POINT)=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

export const UpdateCartItemApi= async(END_POINT,payload)=>{
  return await axios.put(`${BASE_URL}${END_POINT}`,payload,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

export const getCartItemRemoveApi= async(END_POINT)=>{
  return await axios.delete(`${BASE_URL}${END_POINT}`,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

//  WISHLIST API CART

export const getWishlistApi= async(END_POINT)=>{
  return await axios.get(`${BASE_URL}${END_POINT}`,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

export const wishlistRemoveApi= async(END_POINT)=>{
  return await axios.delete(`${BASE_URL}${END_POINT}`,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

export const AddWishlistItemApi= async(END_POINT)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,{},
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

// Order Api
export const orderAPI= async(END_POINT,payload)=>{
  return await axios.post(`${BASE_URL}${END_POINT}`,payload,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}

// Address 
export const AddressAPI=async(END_POINT,payload)=>{
  return await axios.put(`${BASE_URL}${END_POINT}`,payload,
    { 
      headers:{
        "x-access-token":getAuth()
      }
    }
  )
}