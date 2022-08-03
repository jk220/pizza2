import css from "../styles/Menu.module.css";
import { urlFor } from "../lib/client";
import Link from "next/link";
import Image from "next/image";

export default function Menu({ pizzas }) {
    //console.log(pizzas);
    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span>OUR MENU</span>
                <span>Menu That Always</span>
                <span>Make You Fall in Love</span>
            </div>
            <div className={css.menu}>
                {/* pizzas */}
                {pizzas.map((pizza, id) => {
                    const src = urlFor(pizza.image).url();
                    return (
                        <div className={css.pizza} key={id}>

                            <Link href={`./pizza/${pizza.slug.current}`}>
                                <div className={css.imageWrapper}>
                                    <Image loader={() => src} src={src} alt=""
                                        objectFit="cover"
                                        layout="fill"
                                        unoptimized
                                    />
                                </div>
                            </Link>
                            <span>{pizza.name}</span>
                            <span><span style={{ color: "var(--themeRed)" }}>$</span> {pizza.price[0]}</span>
                        </div>
                    )
                })}
            </div>

        </div>
    )
};