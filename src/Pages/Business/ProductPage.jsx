//import React from 'react'
import { useContext, useEffect, useState } from 'react';
import AddProject from "../../components/AddProject"
import BusinessFooter from "../../components/BusinessFooter"
import BusinessHeader from "../../components/BusinessHeader"
import Product from "../../components/Product"
import { userproducts } from '../../service/allApi';
import { deletedResponseContext, editResponseContext } from '../../context/ContextShare';

function ProductPage({}) {
  const [products,setProducts]=useState([])
  const {editResponse}=useContext(editResponseContext)
  const{deletestatus}=useContext(deletedResponseContext)
 console.log(products);
  
  

  const userProducts =async()=>{
      if(sessionStorage.getItem('token')){
          const token = sessionStorage.getItem('token');
          
          const reqHeader = {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            };
            const result = await userproducts(reqHeader)
            setProducts(result.data)
            

      }
  }
  useEffect(()=>{
      userProducts()
  },[editResponse,deletestatus])


  return (
    <>
    <BusinessHeader/>
    <AddProject/>
    <div className="row">
  {products?.map((item) => (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={item._id}>
      <Product product={item} />
    </div>
  ))}
</div>

    <BusinessFooter/>
      
    </>
  )
}

export default ProductPage
