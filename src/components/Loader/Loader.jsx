import React from "react";
import { PulseLoader } from "react-spinners";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loadercontainer}>
      <div className={styles.loadercontent}>
        <PulseLoader
          color="#f59e0b"
          height={6}
          width={200}
          className={styles.loaderBar}
        />
        <p className={styles.loaderText}>Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
