//import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserHeader from '../../components/UserHeader'
import { useEffect,useState } from 'react'
import { GetCartapi } from '../../service/allApi'
import CartCard from '../../components/CartCard'

function Cart() {
  const[product,setproduct]=useState([])
  const [deleteStatus,setDeleteStatus]=useState("")
  console.log(product);
  
   const GetCart =async()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        
        'Authorization': `Bearer ${token}`, // No need for Content-Type with FormData
      };
      const result =await GetCartapi(reqHeader);
      //console.log(result);
      if(result.status==200){
        setproduct(result.data)

      }
      else{
        console.log("Something Went Wrong");
        
      }
      
    }
   }
  useEffect(() =>{
    GetCart()
  },[deleteStatus])
  return (
    <>
      <UserHeader className="mb=5"/>
      <div className="container " style={{marginTop:"100px"}}>
      <h2>Your Cart</h2>
      {product.length > 0 ? (
        product.map((item) => (
          <CartCard
            key={item._id}
            product={item}
            setDeleteStatus={setDeleteStatus}
          />
        ))
      ) : (
        <p>Your cart is empty!</p>
      )}
    </div>
    </>
  )
}

export default Cart
