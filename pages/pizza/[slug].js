import Layout from "../../components/Layout";
import Image from "next/image";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import css from "../../styles/Pizza.module.css";
import { useState } from "react";
import { useStore } from "../../store/store";
import { client, urlFor } from "../../lib/client";
//      npm install react-hot-toast
import toast, { Toaster } from "react-hot-toast";


export default function Pizza({ pizza }) {
    const src = urlFor(pizza.image).url();

    const [Size, setSize] = useState(1);
    const [Quantity, setQuantity] = useState(1);

    const handleQuantity = (param) => {
        param === "inc" ? setQuantity((prev) => prev + 1) :
            Quantity === 1 ? null : setQuantity((prev) => prev - 1);
    };

    //    add to cart function

    const addPizza = useStore((state) => state.addPizza);
    const addToCart = () => {
        addPizza({
            ...pizza, price: pizza.price[Size],
            quantity: Quantity, size: Size
        });
        toast.success('Added to Cart');
    }

    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image
                        loader={() => src}
                        src={src}
                        alt=""
                        layout="fill" unoptimized objectFit="cover"
                    />
                </div>

                {/* right side */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>

                    <span><span style={{ color: "var(--themeRed)" }}>$</span> {pizza.price[Size]}</span>

                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div onClick={() => setSize(0)}
                                className={Size === 0 ? css.selected : ""}>Small</div>
                            <div onClick={() => setSize(1)}
                                className={Size === 1 ? css.selected : ""}>Medium</div>
                            <div onClick={() => setSize(2)}
                                className={Size === 2 ? css.selected : ""}>Large</div>
                        </div>
                    </div>
                    {/* quantity counter */}
                    <div className={css.quantity}>
                        <span>Quantity</span>
                        <div className={css.counter}>
                            <Image
                                width={20}
                                height={20}
                                src={LeftArrow}
                                alt=""
                                objectFit="contain"
                                onClick={() => handleQuantity("dec")}
                            />
                            <span>{Quantity}</span>
                            <Image
                                width={20}
                                height={20}
                                src={RightArrow}
                                alt=""
                                objectFit="contain"
                                onClick={() => handleQuantity("inc")}
                            />

                        </div>
                    </div>
                    <div className={`btn ${css.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
                </div>
                <Toaster />
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    );
    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current== '${slug}'][0]`
    );

    return {
        props: { pizza }
    }

}