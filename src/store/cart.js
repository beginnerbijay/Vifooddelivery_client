import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cartdata')) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      const { id } = payload;

      const find = state.find((item) => item.id === id);

      if (find) {
        return state.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      } else {
        state.push({
          ...payload,
          quantity: 1
        });
      }
    },
    increament(state, { payload }) {
      return state.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    },
    decrement(state, { payload }) {
      return state.map((item) =>
        item.id === payload.id
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      );
    },
    clear(state) {
      return [];
    },
    remove(state,{payload}){
      return state.filter((item)=>
      item.id !== payload.id
      )
    }
  }
});

export const { addToCart, increament, decrement, clear, remove } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
