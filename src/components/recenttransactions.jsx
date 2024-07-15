import styles from "../styles/recenttransactions.module.css";
import Avatar from "../assets/Avatar.png";
import Segment from "./segment";
import { useSelector } from "react-redux";
function RecentTransactions() {
  const data = useSelector((state) => state.appData);
  let lastTransactions = data.lastTransactions;
  return (
    <div className={styles["main-container"]}>
      <h3>Recent Transactions</h3>
      <p>All your recent transactions can be viewed here.</p>
      <>
        {/* Conditionally render Segments if lastTransactions has data */}
        {lastTransactions.length > 0 ? (
          lastTransactions
            .slice()
            .reverse()
            .slice(0, 3)
            .map((item, index) => (
              <Segment
                key={index}
                image={item.image}
                title={item.description}
                amount={item.amount}
                date={item.date}
                method={item.method}
              />
            ))
        ) : (
          <p>No transactions found.</p>
        )}
      </>
    </div>
  );
}
export default RecentTransactions;
