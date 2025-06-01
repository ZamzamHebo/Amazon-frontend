import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../components/LayOut/LayOut";
import styles from "./Orders.module.css";
import { DataContext } from "../../components/Context/Context";
import { db } from "../../../Firebase/Firebase";
import ProductCard from "../../components/Product/ProductCard";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, "users", user.uid, "orders");
      const q = query(ordersRef, orderBy("created", "desc"));

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        },
        (error) => {
          console.error("Error fetching orders:", error);
        }
      );

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.orders_container}>
          <h2 className={styles.title}>Your Orders</h2>
          <div className={styles.order_list}>
            {orders.map((order) => (
              <div className={styles.order_card} key={order.id}>
                <div className={styles.order_header}>
                  <p className={styles.order_id}>order id: {order.id}</p>
                </div>
                <div className={styles.products_list}>
                  {order?.data?.cart?.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      notdisplayAdd={true}
                    />
                  ))}
                </div>
                {/* <div className={styles.order_footer}>
                  <p className={styles.order_total}>
                    Total: ${order.data.amount / 100}
                  </p>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
