export const ApplicationViews = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    if (honeyUserObject) {

        return <div>Application Views If</div>

    }
    else {
        return <div>Application Views Else</div>
    } 
}
