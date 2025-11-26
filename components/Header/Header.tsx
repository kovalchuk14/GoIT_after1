import Link from "next/link";
import css from "./Header.module.css";
import Image from "next/image";

export default function Header() {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                <Image
                    className={css.logo}
                    src="/Logo.svg"
                    alt="RentalCar logo"
                    width={104}
                    height={16}
                    priority
                />
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/catalog">Catalog</Link>
                    </li>
                </ul>
            </nav>
                
        </header>
    );
}