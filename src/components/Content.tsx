import { useEffect, useState } from 'react';
import { MovieProps } from '../Interfaces/MovieProps';
import { api } from '../services/api';
import { Header } from './Header';
import { MovieCard } from './MovieCard';

interface ContentProps {
  selectedGenreId: number;
}

export function Content(props: ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.selectedGenreId}`).then(response => {
      setMovies(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, [props.selectedGenreId]);

  return(
    <div className="container">
      <Header selectedGenreId = {props.selectedGenreId} />
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  )
}