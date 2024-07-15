import styles from "../styles/recenttransactions.module.css"
import Avatar from "../assets/Avatar.png"
function RecentTransactions(props){
    return(<div className= {styles["main-container"]}>
        <h3 >Recent Transactions</h3>
        <p>All your recent transactions can be viewed here.</p>
        <div className= {styles["recentSegment"]}>
            <div>
            <img className = {styles["imagetype"]}src = {props.image}></img>
            </div>
            <div>
                <h3>{props.title}</h3>
                <p>{props.method}</p>
            </div>
            <div>
                <h3>{props.price}</h3>
                <p>{props.date}</p>
            </div>
        </div>
    </div>)
}
export default RecentTransactions;