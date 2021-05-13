import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../Interfaces/GenreProps';
import { api } from '../services/api';
import { Button } from './Button';

interface ContentProps {
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
  selectedGenreId: number;
}

export function SideBar(props: ContentProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  function handleClickButton(id: number) {
    props.setSelectedGenreId(id);
  }
  
  return(
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() =>  handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>

    </nav>
  )
}