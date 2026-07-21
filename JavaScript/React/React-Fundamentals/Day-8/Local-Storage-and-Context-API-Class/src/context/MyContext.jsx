import { createContext,useState } from "react";

export const MyStore = createContext();


export const ContextProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    return <MyStore.Provider value={{isCartOpen, setIsCartOpen, cartItems, setCartItems}}>{children}</MyStore.Provider>
}