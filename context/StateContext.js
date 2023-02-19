import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
// it is the pop - up notification that occurrs 
// whenever we remove or add some item in react or some other thing

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  // we are even including local storage so that
  // if the user exits the page and gets back , all of its data is restored 
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);
    
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    
    if(checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if(cartProduct._id === product._id) return {
          ...cartProduct,
          // this is the element which is already present in the cart, so we want to increase its price
          quantity: cartProduct.quantity + quantity
        }
        // then we are going to return a new object which is going to spread the cart product 
        // 
      })

      setCartItems(updatedCartItems);
    } 
    else {
      product.quantity = quantity;
      
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  } 

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
    setCartItems(newCartItems);
  }

  const toggleCartItemQuanitity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id)
    index = cartItems.findIndex((product) => product._id === id);
    // use of triple equal
    const newCartItems = cartItems.filter((item) => item._id !== id)
    // as we can't simply edit the cart items
    // what we do it is create new card items
    // with the product we are working on leaving it behind
    // if we apply operations on states directly that
    // we are mutating them in a wrong way which should be avoided
    



// states object shouldn't be updated with the = sign
// we should always use set functions
    if(value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity + 1 } ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
    } else if(value === 'dec') {
      if (foundProduct.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct, quantity: foundProduct.quantity - 1 } ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
        setTotalQuantities((prevTotalQuantities )=> prevTotalQuantities - 1)
      }
    }
  }

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }// call back function, as we are using prev function of that same state

  const decQty = () => {
    setQty((prevQty) => {
      if(prevQty - 1 < 1) return 1;
     
      return prevQty - 1;
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities 
      }}
      // we are going to return context provider, passing in our children, we are not rendering any thing, just going to wrap everything where context is required under context provider and set it's values
      // to make this possible we have to go to app.js and wrap our every component
      // withing statecontext
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);

// we will be creating a special function to more easily grab the state,
// usecontext(context)
/// that is gonna allow us to use our state as we use hook