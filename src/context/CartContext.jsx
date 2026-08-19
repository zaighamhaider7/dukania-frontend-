import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [storeUsername, setStoreUsername] = useState("");

    useEffect(() => {
        if (!storeUsername) return;

        const cartKey = `cart_${storeUsername}`;

        const savedCart = localStorage.getItem(cartKey);

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        } else {
            setCart([]);
        }
    }, [storeUsername]);

    useEffect(() => {
        if (!storeUsername) return;

        const cartKey = `cart_${storeUsername}`;

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );
    }, [cart, storeUsername]);

    const addToCart = (product, quantity) => {
        setCart((currentCart) => {

            const existingProduct = currentCart.find(
                (item) => item.productId === product._id
            );

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.productId === product._id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity,
                        }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    productId: product._id,
                    productName: product.productName,
                    price: product.discountPrice || product.productPrice,
                    image: product.productImages?.[0] || "",
                    quantity: quantity,
                },
            ];
        });
    };

    const increaseQuantity = (productId) => {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.productId === productId
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.productId === productId
                        ? {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart((currentCart) =>
            currentCart.filter(
                (item) => item.productId !== productId
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                storeUsername,
                setStoreUsername,
                addToCart,
                increaseQuantity,
                decreaseQuantity,
                removeFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};