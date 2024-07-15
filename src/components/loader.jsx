import { Triangle } from "react-loader-spinner";
import styles from "../styles/apploader.module.css";
function AppLoader() {
  return (
    <div className={styles["loader-overlay"]}>
      <div className={styles["loader-container"]}>
        <Triangle
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    </div>
  );
}

export default AppLoader;
