import { createContext, useState } from "react";



export const editResponseContext =createContext({})
export const deletedResponseContext =createContext({})
export const loginResponseContext = createContext({})

function ContextShare({children}) {
    const [editResponse,setEditResponse]=useState([])
    const [deletestatus,setDeletestatus]=useState([])
    const[loginResponse,setLoginResponse] = useState(false)

  return (
    <>
    <editResponseContext.Provider value={{editResponse,setEditResponse}}>
   <deletedResponseContext.Provider value={{deletestatus,setDeletestatus}}>
   <loginResponseContext.Provider value={{loginResponse,setLoginResponse}}>

{children}
</loginResponseContext.Provider>
</deletedResponseContext.Provider>
    </editResponseContext.Provider>
      
    </>
  )
}

export default ContextShare
