// import Image from "next/image";
import css from "./page.module.css";

import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className={css.banner}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <h2 className={css.subtitile}>Reliable and budget-friendly rentals for any journey</h2>
        <Link href="/catalog" className={css.link}>View Catalog</Link>
      </section>

    </main>
  );
}

