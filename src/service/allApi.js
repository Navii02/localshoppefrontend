import { commonApi } from "./CommonApi";
import { url } from "./ServiceUrl";


export const businessRegister=async(reqBody)=>{
    return await commonApi("POST",`${url}/business-register`,reqBody,"")
}
export const businessLogin = async(reqBody)=>{
    return await commonApi("POST",`${url}/business-login`,reqBody,"")

}
export const adminregister=async(reqBody)=>{
    return await commonApi("POST",`${url}/admin-register`,reqBody,"")
}
export const adminlogin = async(reqBody)=>{
    return await commonApi("POST",`${url}/admin-login`,reqBody,"")

}
export const BusinessRegistration=async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${url}/business-registration`,reqBody,reqHeader)
}
export const AddProduct = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${url}/product`,reqBody,reqHeader)
}
export const userproducts = async(reqHeader)=>{
    return await commonApi("GET",`${url}/user-products`,"",reqHeader)
}

export const project = async (options = {}) => {
    return await commonApi("GET", `${url}/products`, null, options.headers,options.params);
};

export const UpdateProduct= async(id,reqBody,reqHeader)=>{
    return await commonApi("PUT",`${url}/update-product/${id}`,reqBody,reqHeader)
}
export const DeleteProduct =async(id,reqHeader)=>{
    return await commonApi("DELETE",`${url}/delete-product/${id}`,{},reqHeader)
}
export const UserRegister=async(reqBody)=>{
    return await commonApi("POST",`${url}/user-register`,reqBody,"")
}
export const UserLogin = async(reqBody)=>{
    return await commonApi("POST",`${url}/user-login`,reqBody,"")

}
export const Whishlistapi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${url}/wishlist`,reqBody,reqHeader)
}
export const RemoveFromWishlistApi = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${url}/remove-wishlist`,reqBody,reqHeader)
}
export const getwishlistapi = async(reqHeader)=>{
    return await commonApi("GET",`${url}/get-wishlist`,"",reqHeader)
}
export const ProductDetail = async(id)=>{
    return await commonApi("GET",`${url}/product-detail/${id}`,"",)
}
export const AddtoCart = async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${url}/addto-cart`,reqBody,reqHeader)
}
export const GetCartapi =async(reqHeader)=>{
    return await commonApi("GET",`${url}/get-cart`,"",reqHeader)
}
export const removeFromCartApi=async(id,reqHeader)=>{
    return await commonApi("DELETE",`${url}/remove-from-cart/${id}`,{},reqHeader)
}
export const Savelocation= async(reqBody,reqHeaders)=>{
    return await commonApi("PUT",`${url}/save-location`,reqBody,reqHeaders)
}
export const getUserDetailsApi=async(reqHeader)=>{
    return await commonApi("GET",`${url}/user-details`,"",reqHeader)

}

export const getProductByIdApi=async(productId)=>{
    return await commonApi("GET",`${url}/product-details/${productId}`)

}
export const orderPlacement =async(reqBody)=>{
    return await commonApi("POST",`${url}/orderplacement`,reqBody)
}
export const Orderdetails =async(reqHeader)=>{
    return await commonApi("GET",`${url}/business/order-details`,{},reqHeader)
}
export const productchartapi = async(reqHeader)=>{
    return await commonApi("GET",`${url}/chartproducts`,{},reqHeader)
}
export const addreview =async(id,reqBody)=>{
    return await commonApi("POST",`${url}/addreview/${id}`,reqBody)
}
export const pendingusersapi =async()=>{
    return await commonApi("GET",`${url}/pendingusers`,"")
}
export const businessuserapproval=async(id,reqBody)=>{
    return await commonApi("PUT",`${url}/user-approval/${id}`,reqBody)
}
export const BusinessUsers =async()=>{
    return await commonApi("GET",`${url}/business-users`,)
}
export const fetchusersApi =async()=>{
    return await commonApi("GET",`${url}/admin-users`,)
}
export const userstastics = async()=>{
    return await commonApi("GET",`${url}/admin/user-stats`)
}
export const Businessuser =async(reqHeader)=>{
    return await commonApi("GET",`${url}/business/businessuser`,"",reqHeader)
}
export const getreviews = async(reqHeader)=>{
    return await commonApi("GET",`${url}/business/reviews`,"",reqHeader)
}
export const getUserOrdersApi =async(reqHeader)=>{
    return await commonApi("GET",`${url}/user/orders`,"",reqHeader)
}
export const updateCartQuantityApi=async(reqBody,reqHeader)=>{
    return await commonApi("PUT",`${url}/user/cartitem-incrementation`,reqBody,reqHeader)

}