import styles from "../styles/profile.module.css"
import Avatar from "../assets/Avatar.png"
function Profile(){
    return(<div className= {styles["main-profile-container"]}>
        <h2>Profile</h2>
        <div className= {styles["avatarDiv"]}>
            <img className = {styles["avatarimg"]}src = {Avatar}></img>
        </div>
        <h3>Hi Umer!</h3>
        <button>Change Profile pic</button>
    </div>)
}
export default Profile;