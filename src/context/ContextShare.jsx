import { createContext, useState } from "react";



export const editResponseContext =createContext({})
export const deletedResponseContext =createContext({})
function ContextShare({children}) {
    const [editResponse,setEditResponse]=useState([])
    const [deletestatus,setDeletestatus]=useState([])
  return (
    <>
    <editResponseContext.Provider value={{editResponse,setEditResponse}}>
   <deletedResponseContext.Provider value={{deletestatus,setDeletestatus}}>
{children}
</deletedResponseContext.Provider>
    </editResponseContext.Provider>
      
    </>
  )
}

export default ContextShare
