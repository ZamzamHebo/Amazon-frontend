import React, { useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import styles from "./ProductDetail.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../components/Product/ProductCard";
import Loader from "../../components/Loader/Loader";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`${productUrl}/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(`Error on fetching product${err}`);
        setIsLoading(false);
      });
  }, []);
  return (
    <LayOut>
      <div className={styles.product_detail_header}>
        <h1>Product Detail</h1>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.productDetailContainer}>
          <ProductCard product={product} detail={true} notdisplayAdd={true} />
        </div>
      )}
    </LayOut>
  );
}

export default ProductDetail;
