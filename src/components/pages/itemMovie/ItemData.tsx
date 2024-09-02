"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import scss from "./ItemData.module.scss";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`;

interface TodoType {
  poster_path: string;
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  tagline: string;
  vote_average: string;
  status: string;
}

interface TodoActor {
  profile_path: string;
  id: number;
  name: string;
}

interface VideoType {
  key: string;
  id: string;
  name: string;
  type: string;
}

interface TodoPoPular {
  poster_path: string;
  id: number;
  title: string;
}

const ItemData = () => {
  const [todo, setTodo] = useState<TodoType | null>(null);
  const [actors, setActors] = useState<TodoActor[]>([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [popular, setPopular] = useState<TodoPoPular[]>([]);

  const { id } = useParams<{ id: string }>();

  const fetchData = async () => {
    if (!id) return;

    const urlMovie = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`;

    try {
      const { data } = await axios.get(urlMovie);
      setTodo(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchActor = async () => {
    if (!id) return;

    const urlActor = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`;
    try {
      const { data } = await axios.get(urlActor);
      setActors(data.cast);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchVideo = async () => {
    if (!id) return;

    const urlVideo = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`;
    try {
      const { data } = await axios.get(urlVideo);
      setVideos(data.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const fetchPopular = async () => {
    try {
      const { data } = await axios.get(urlPopular);
      setPopular(data.results);
    } catch (error) {
      console.error("Popular error", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchActor();
    fetchVideo();
    fetchPopular();
  }, [id]);

  return (
    <>
      <section>
        {todo ? (
          <>
            <div
              style={{
                background: `url(${
                  "https://image.tmdb.org/t/p/original/" + todo.backdrop_path
                })no-repeat center/cover`,
              }}
              className={scss.card1}
            >
              <div className="container">
                <div className={scss.card2}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${todo.poster_path}`}
                    alt={todo.title}
                  />
                  <div className={scss.text}>
                    <h1>{todo.title}</h1>
                    <h4>{todo.tagline}</h4>
                    <h3>Overview</h3>
                    <p>{todo.overview}</p>
                    <div className={scss.textH5}>
                      <h5>{todo.vote_average}</h5>
                      <h5>Release Date: {todo.release_date}</h5>
                      <h5>Status: {todo.status}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/7466/7466073.png"
            alt=""
          />
        )}
      </section>
      <div className={scss.cardDetail}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.poster_path}>
              <h1 className={scss.dis}>Top Cast</h1>
              <div className={scss.acter}>
                {actors.length > 0 ? (
                  actors.map((actor) => (
                    <div key={actor.id} className={scss.card}>
                      {actor.profile_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                          alt={actor.name}
                        />
                      )}
                      <h2>{actor.name}</h2>
                    </div>
                  ))
                ) : (
                  <p>Нет данных</p>
                )}
              </div>
              <h1 className={scss.dis}>Official Videos</h1>
              <div className={scss.video}>
                {videos.length > 0 ? (
                  videos.slice(0, 3).map((video) => (
                    <div key={video.id} className={scss.card}>
                      <iframe
                        className={scss.asim}
                        // width="560"
                        // height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                      <h2>{video.name}</h2>
                    </div>
                  ))
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1661/1661952.png"
                    alt=""
                  />
                )}
              </div>

              <h1 className={scss.dis}>Recommendations</h1>
              <div className={scss.poster}>
                {popular.length > 0 ? (
                  popular.map((el) => (
                    <div key={el.id} className={scss.card}>
                      <Link href={`/item/${el.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                          alt={el.title}
                        />
                      </Link>
                      <h2>{el.title}</h2>
                    </div>
                  ))
                ) : (
                  <p>Нет данных</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemData;
