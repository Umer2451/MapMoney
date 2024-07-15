import styles from "../styles/recenttransactions.module.css"
function Segment(props){
    return( <div className= {styles["recentSegment"]}>
        <div style={{position: "relative", top: "5px"}}>
        <img className = {styles["imagetype"]}src = {props.image}></img>
        </div>
        <div style={{Width: "64vh", position: "relative", top: "5px"}}>
            <h3>{props.title}</h3>
            <p>{props.method}</p>
        </div>
        <div style={{position: "relative", top: "5px"}}>
            <h3>{props.amount}</h3>
            <p>{props.date}</p>
        </div>
    </div>)
}
export default Segment;