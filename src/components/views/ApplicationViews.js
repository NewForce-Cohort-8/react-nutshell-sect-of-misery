export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    if (honeyUserObject) {

        return <div>Yeah buddy</div>

    }
    else {
        return <div>Noooo buddy</div>
    } 
}
