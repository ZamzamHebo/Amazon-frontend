import React from "react";
import styles from "./Catergory.module.css";
import { categoryInfos } from "./categoryFullInfos";
import CatergoryCard from "./CatergoryCard";

function Category() {
  return (
    <section className={styles.catergory__container}>
      {categoryInfos.map((data, i) => (
        <CatergoryCard data={data} key={i} />
      ))}
    </section>
  );
}

export default Category;
