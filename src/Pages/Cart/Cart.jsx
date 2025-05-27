// import React from "react";
// import LayOut from "../../components/LayOut/LayOut";
// import styles from "./Cart.module.css";
// import { useContext } from "react";
// import { DataContext } from "../../components/Context/Context";

// function Cart() {
//   const [{ cart, user }, dispatch] = useContext(DataContext);
//   return (
//     <LayOut>
//       <section>
//         <div>
//           <h2>Hello</h2>
//           <h3>Your shopping cart</h3>
//           <hr />
//           {cart?.length === 0 ? (
//             <p>No item in your cart</p>
//           ) : (
//             cart?.map((product) => {
//               return (
//                 <ProductCard
//                   product={product}
//                   detail={true}
//                   key={product.id}
//                   notdisplayAdd={true}
//                 />
//               );
//             })
//           )}
//         </div>
//         <div></div>
//       </section>
//     </LayOut>
//   );
// }

// export default Cart;

import { useContext } from "react";
import LayOut from "../../components/LayOut/LayOut";
import { DataContext } from "../../components/Context/Context";
import ProductCard from "../../components/Product/ProductCard";
import CurrencyFormat from "../../components/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/Action.type";
import styles from "./Cart.module.css";
import { MdDelete } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import { Alert } from "react-bootstrap";

function Cart() {
  const [{ cart, user }, dispatch] = useContext(DataContext);

  const total = cart.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  //increment function
  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_CART,
      item,
    });
  };

  //Decrement function
  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_CART,
      id,
    });
  };

  return (
    <LayOut>
      <section className={styles.container}>
        <div className={styles.cart__container}>
          <h2>Hello</h2>
          <h3>Your Shopping cart</h3>
          <hr />

          {cart?.length == 0 ? (
            <Alert variant="info">Oppss! No item in your cart</Alert>
          ) : (
            cart?.map((item, i) => {
              return (
                <section key={i} className={styles.cart_product}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    flex={true}
                    addButton={false}
                  />

                  <div className={styles.btn_container}>
                    <button
                      className={styles.btn}
                      onClick={() => increment(item)}
                    >
                      <IoIosArrowUp size={20} />
                    </button>

                    <span>{item.amount}</span>

                    {item.amount === 1 ? (
                      <button
                        className={styles.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <MdDelete size={20} />
                      </button>
                    ) : (
                      <button
                        className={styles.btn}
                        onClick={() => decrement(item.id)}
                      >
                        <IoIosArrowDown size={20} />
                      </button>
                    )}
                  </div>
                </section>
              );
            })
          )}
        </div>

        {cart?.length !== 0 && (
          <div className={styles.subtotal}>
            <div>
              <p>Subtotal ({cart?.length} items)</p>
              <CurrencyFormat amount={total} />
            </div>

            <span>
              <input type="checkbox" />
              <small>This order contains a gift</small>
            </span>

            <Link to="/payments">Continue to checkout</Link>
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Cart;
