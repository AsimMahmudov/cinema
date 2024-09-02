"use client";
import Link from "next/link";
import scss from "./Header.module.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Header = () => {
  const [search, setSearch] = useState("");
  const nav = useRouter();

  return (
    <header className={scss.Header}>
      <div className="container">
        <div className={scss.content}>
          <Link href={`/`}>
            <div className={scss.logo}>
              <img
                src="https://ecomovie.life/assets/eco-movie-logo-a8_bjuTM.svg"
                alt=""
              />
            </div>
          </Link>
          <div className={scss.search}>
            <input
              placeholder="search"
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => nav.push(`/ser/${search}`)}
              className={scss.btn}
            >
              search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
