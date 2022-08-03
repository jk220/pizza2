import { useStore } from "../store/store";
import { useState } from "react";
import Layout from "../components/Layout";
import { urlFor } from "../lib/client";
import css from "../styles/Cart.module.css";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import OrderModal from "../components/OrderModal";

export default function Cart() {
    const cartData = useStore((state) => state.cart);
    const removePizza = useStore((state) => state.removePizza);
    const [PaymentMethod, setPaymentMethod] = useState(null);
    const [Order, setOrder] = useState(
        typeof window !== 'undefined' && localStorage.getItem('order')
    )

    const handleRemove = (i) => {
        removePizza(i);
        toast.error("Item Removed");
    }
    //    total function   
    const initialValue = 0;
    const reducer = (sum, item) => sum + item.quantity * item.price;
    const total = () => cartData.pizzas.reduce(reducer, initialValue);
    //    
    const handleonDelivery = () => {
        setPaymentMethod(0); //set on Delivery method
        //alert('Set on Delivery Method');
        typeof window !== 'undefined' && localStorage.setItem('total', total());
    }

    return (
        <Layout>
            <div className={css.container}>

                {/*   details   */}
                <div className={css.details}>
                    <table className={css.table}>
                        <thead>
                            <th>Pizza</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </thead>
                        <tbody className={css.tbody}>
                            {cartData.pizzas.length > 0 &&
                                cartData.pizzas.map((pizza, i) => {
                                    const src = urlFor(pizza.image).url();
                                    return (
                                        <tr key={i}>
                                            <td className={css.imageTd}>
                                                <Image
                                                    loader={() => src}
                                                    src={src}
                                                    className={css.imageTd}
                                                    alt=""
                                                    objectFit="cover"
                                                    width="85"
                                                    height="85"

                                                />
                                            </td>
                                            <td>
                                                {pizza.name}
                                            </td>
                                            <td>
                                                {
                                                    pizza.size === 0 ? "Small" :
                                                        pizza.size === 1 ? "Medium" :
                                                            "Large"
                                                }
                                            </td>
                                            <td>
                                                {pizza.price}
                                            </td>
                                            <td>
                                                {pizza.quantity}
                                            </td>
                                            <td>
                                                {pizza.price * pizza.quantity}
                                            </td>
                                            <td style={{
                                                color: "var(--themeRed)",
                                                cursor: "pointer"
                                            }}
                                                onClick={() => handleRemove(i)}
                                            >
                                                X
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/*     Summary    */}
                <div className={css.cart}>
                    <span>Cart</span>
                    <div className={css.cartDetails}>
                        <div>
                            <span>Items</span>
                            <span>{cartData.pizzas.length}</span>
                        </div>
                        <div>
                            <span>Total</span>
                            <span>$ {total()}</span>
                        </div>
                    </div>

                    { !Order && cartData.pizzas.length > 0 ? (
                        <div className={css.buttons}>
                            <button className="btn" onClick={handleonDelivery}>Pay on Delivery</button>
                            <button className="btn" onClick={() => { alert("Paid Now") }}>Pay Now</button>
                        </div>
                    ): null

                    }


                </div>
            </div>
            <Toaster />
            {/*    Modal  Form   */}
            <OrderModal
                opened={PaymentMethod === 0}
                setOpened={setPaymentMethod}
                PaymentMethod={PaymentMethod}

            />
        </Layout>
    )
};
