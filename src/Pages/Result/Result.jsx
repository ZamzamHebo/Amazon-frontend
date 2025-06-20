import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LayOut from "../../components/LayOut/LayOut";
import ProductCard from "../../components/Product/ProductCard";
import styles from "./Result.module.css";
import { productUrl } from "../../Api/endPoints";
import Loader from "../../components/Loader/Loader";

function Result() {
  const { category } = useParams();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const formatted = category.toLocaleLowerCase();

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products/category/${formatted}`)
      .then((res) => {
        setResults(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(`Error on fetching product ${err}`);
        setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <section className={styles.results_container}>
        <h1>Results</h1>
        <p>Category / {category}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={styles.products_container}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Result;
