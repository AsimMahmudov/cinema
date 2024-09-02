"use client";
import scss from "./Footer.module.scss";
import { BsGithub } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { BsTelegram } from "react-icons/bs";

const Footer = () => {
  return (
    <div className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.discription}>
            <p>
              GalaxyMovie - уникальный сайт, предоставляющий увлекательную
              информацию о фильмах и сериалах. Здесь вы сможете узнать все
              необходимые подробности о любимых фильмах, актерах, режиссерах,
              рейтингах и многом другом. GalaxyMovie может похвастаться стильным
              и интуитивно понятным интерфейсом, который сделает ваш поиск
              шедевров кинематографа максимально удобным и приятным.
            </p>
          </div>

          <div className={scss.homebtn}>
            <a href="https://github.com/AsimMahmudov/">
              <button>
                <BsGithub />
              </button>
            </a>
            <a href="https://www.instagram.com/asim_mah05/">
              <button>
                <GrInstagram />
              </button>
            </a>
            <a href="https://t.me/MahmudovAsim">
              <button>
                <BsTelegram />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
