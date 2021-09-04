import React,{useEffect} from "react"
import "./profile.scss"
import NavBar from "../../navbar/index"
import ProfileCard from "./profileCard"


 const Profile = ({history}) =>{
    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
          history.push("/login");
        }
    },[history]);
    return(
        <div className="mainDiv">
            <div className="header" align="center">
        <NavBar />
        <ProfileCard />
        </div>
        </div>
        )
}

export default Profile