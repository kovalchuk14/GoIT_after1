import css from "./CarList.module.css"
import Link from "next/link";

const spritePath = "/sprite.svg";

export default function CarList() {
    return (
        <div className="container">
            <ul className={css.list}>
                <li className={css.card} key={1}>
                    <div className={css.imgContainer}>
                        <img className={ css.carPhoto} src="/images/banner-background/pc1x.jpg" alt="car" />
                        <svg
                            width="16"
                            height="16"
                            className={css.favouriteSvg}
                        >
                            <use href={`${spritePath}#icon-heart`} />
                        </svg>
                    </div>
                    <div className={css.description}>
                        <div className={css.title}>
                            <p>lala<span className={css.model}> asd</span> asasd</p>
                            <p> 40</p>
                        </div>
                        <div className={ css.info}>
                            <p> lasdlasld | alsdls | asdkasd</p>
                            <p>alsdlasd | aalsad</p>
                        </div>
                    </div>
                    {/* <Link href="/catalog" className={ css.button} >Read more</Link> */}
                </li>
                

            </ul>
        </div>
    );
}