import React from "react";
import { Link } from "react-router-dom";
import styles from "./Catergory.module.css";
function CatergoryCard({ data }) {
  return (
    <div className={styles.catergory}>
      <Link to={`/category/${data.name}`}>
        ;
        <span>
          <h2>{data.title}</h2>
        </span>
        <img src={data.imgLink} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatergoryCard;
