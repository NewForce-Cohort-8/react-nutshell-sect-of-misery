import "./NavBar.css"
import { UserNav } from "./UserNav"

export const NavBar = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    if (honeyUserObject.staff) {

        return <div>Yeah yeah yeah</div>

    }
    else {
        return <UserNav />
    } 
}