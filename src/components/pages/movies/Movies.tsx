"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import scss from "../movies/Movies.module.scss"; // Assuming you're using SCSS modules for styling
import React from "react";
import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { useRouter } from "next/navigation";

interface Imov {
  poster_path: string;
  id: number;
  title: string;
  release_date: string;
  overview: string;
  vote_average: string;
}

const Movies = () => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const urlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`;
  const urlTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ru-RU&page=1`;
  const urlNew = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ru-RU&page=1`; // Seems to be the same as top-rated

  console.log(API_KEY);

  const [search, setSearch] = useState("");
  const nav = useRouter();

  const [popularMovies, setPopularMovies] = useState<Imov[]>([]);
  const [topMovies, setTopMovies] = useState<Imov[]>([]);
  const [newMovies, setNewMovies] = useState<Imov[]>([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(urlPopular);
        setPopularMovies(response.data.results);
        setSearch("");
      } catch (error) {
        console.error("Error ", error);
      }
    };

    const fetchTopMovies = async () => {
      try {
        const response = await axios.get(urlTop);
        setTopMovies(response.data.results);
      } catch (error) {
        console.error("Error ", error);
      }
    };

    const fetchNewMovies = async () => {
      try {
        const response = await axios.get(urlNew);
        setNewMovies(response.data.results);
      } catch (error) {
        console.error("Error  :", error);
      }
    };

    fetchPopularMovies();
    fetchTopMovies();
    fetchNewMovies();
  }, []);

  return (
    <>
      <section>
        <div className={scss.Search}>
          <h2>
            <span>
              <Typewriter
                words={[
                  "Discover Movie Magic at GalaxyMovie",
                  "Get Ready for Cinematic Bliss",
                  "Welcome to GalaxyMovie - Enjoy the Show!",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={70}
                delaySpeed={1500}
              />
            </span>
          </h2>

          <div className={scss.int}>
            <input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for a movie and tv show..."
              type="text"
            />
            <button onClick={() => nav.push(`/ser/${search}`)}>Search</button>
          </div>
        </div>
      </section>

      <div className={scss.Movies}>
        <div className="container">
          <div className={scss.content}>
            <div className={scss.block}>
              <div className={scss.movieBox}>
                <h2>Popular Movies</h2>
                <div className={scss.movieList}>
                  {popularMovies.map((movie) => (
                    <div key={movie.id} className={scss.movieItem}>
                      <Link href={`/item/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                      <h6>{movie.vote_average}</h6>

                      <h3>{movie.title}</h3>
                      <p>{movie.release_date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={scss.movieBox}>
                <h2>Popular Movies</h2>
                <div className={scss.movieList}>
                  {topMovies.map((movie) => (
                    <div key={movie.id} className={scss.movieItem}>
                      <Link href={`/item/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                      <h6>{movie.vote_average}</h6>

                      <h3>{movie.title}</h3>
                      <p>{movie.release_date}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={scss.movieBox}>
                <h2>Popular Movies</h2>
                <div className={scss.movieList}>
                  {newMovies.map((movie) => (
                    <div key={movie.id} className={scss.movieItem}>
                      <Link href={`/item/${movie.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                          alt={movie.title}
                        />
                      </Link>
                      <h6>{movie.vote_average}</h6>

                      <h3>{movie.title}</h3>
                      <p>{movie.release_date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movies;
