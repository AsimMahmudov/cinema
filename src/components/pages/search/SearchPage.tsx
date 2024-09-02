"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import scss from "./SearchPage.module.scss";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

interface TodoType {
  poster_path: string;
  id: number;
  title: string;
}

const SearchPage = () => {
  const [todo, setTodo] = useState<TodoType[]>([]);
  const params = useParams(); // Don't use generics here
  const { id } = params; // Extract id from params

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${id}`
      );
      setTodo(data.results); // Use data.results instead of data directly
      console.log(data.results);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div className={scss.SearchPage}>
      <div className="container">
        <div className={scss.box}>
          {Array.isArray(todo) &&
            todo.map((el) => (
              <div className={scss.card} key={el.id}>
                <Link href={`/item/${el.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${el.poster_path}`}
                    alt={el.title}
                  />
                </Link>
                <h2 key={el.id}>{el.title}</h2>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
