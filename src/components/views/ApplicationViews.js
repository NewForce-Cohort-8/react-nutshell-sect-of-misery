import { MessageForm } from "../messages/MessageForm"
import { MessageList } from "../messages/MessageList"




export const ApplicationViews = () => {
	
    // const localHoneyUser = localStorage.getItem("honey_user")
    // const honeyUserObject = JSON.parse(localHoneyUser)
   return <>
  
   <MessageForm/>
   <MessageList/>
  
   </> 
   
}
