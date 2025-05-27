import { Type } from "./Action.type";

export const initial = { cart: [] };

export function reducer(state, action) {
  switch (action.type) {
    case Type.ADD_TO_CART:
      const existingItem = state.cart.find(
        (item) => item.id === action.item.id
      );

      if (!existingItem) {
        return {
          ...state,
          cart: [...state.cart, { ...action.item, amount: 1 }],
        };
      } else {
        const updatedCart = state.cart.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return { ...state, cart: updatedCart };
      }

    case Type.REMOVE_FROM_CART:
      const index = state.cart.findIndex((item) => item.id === action.id);
      let newCart = [...state.cart];

      if (index >= 0) {
        if (newCart[index].amount > 1) {
          newCart[index] = {
            ...newCart[index],
            amount: newCart[index].amount - 1,
          };
        } else {
          newCart.splice(index, 1);
        }
      }
      return { ...state, cart: newCart };

    default:
      // throw new Error("Unknown Action");
      return state;
  }
}
// export { reducer, initial };
