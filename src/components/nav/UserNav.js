import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const UserNav = () => {
    const navigate = useNavigate()

    return (
        // 
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/tickets">Tickets</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/employees">Employees</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/customers">Customers</Link>
        //     </li>
        //     <li className="navbar__item active">
        //         <Link className="navbar__link" to="/profile">Profile</Link>
        //    </li>
        <ul className="navbar">
            {
                localStorage.getItem("honey_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("honey_user")
                            navigate("/", {replace: true})
                        }}><button className="btn btn-primary">Logout</button></Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
