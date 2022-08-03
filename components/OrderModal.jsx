import { Modal, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { useStore } from "../store/store";
import { createOrder } from "./../lib/orderHandler";
import css from "../styles/OrderModal.module.css";
import {useRouter} from "next/router";
import toast, {Toaster} from 'react-hot-toast';

export default function OrderModal({ opened, setOpened, PaymentMethod }) {
    //
    //  https://mantine.dev/core/modal/#customize-overlay
    //  npm install @mantine/core @mantine/hooks
    //
    const theme = useMantineTheme();
    const router = useRouter();
    const [FormData, setFormData] = useState({});
    const handleInput = (el) => {
        setFormData({
            ...FormData,
            [el.target.name]: el.target.value
        });
    }
    const resetCart = useStore((state)=> state.resetCart);
    const handleSubmit = async (el) => {
        el.preventDefault();
        //console.log(FormData);
        const id = await createOrder({...FormData, total, PaymentMethod});
        toast.success("The Order placed");
        resetCart();
        {
            typeof window !== 'undefined' && localStorage.setItem('order', id);
        }    
        router.push(`/order/${id}`);
    }

    const total = typeof window !== 'undefined' && localStorage.getItem('total');

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(null)}
        >
            {/* Modal content */}
            <form onSubmit={handleSubmit} className={css.formContainer}>
                <input onChange={handleInput} type="text" name="name" placeholder="Name" required />
                <input onChange={handleInput} type="text" name="phone" placeholder="Phone Number" required />
                <textarea onChange={handleInput} name="address" rows={3} placeholder="Address"></textarea>
                <span>
                    You will pay <span>${total}</span> on delivery.
                </span>
                <button type="Submit" className="btn">Submit Order</button>
            </form>
            <Toaster />
        </Modal>
    )
}