import { useEffect, useState } from 'react';
import { GenreResponseProps } from '../Interfaces/GenreProps';
import { api } from '../services/api';

interface ContentProps {
    selectedGenreId: number;
  }

export function Header (props: ContentProps) {

    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    if (!props.selectedGenreId) {
        return null;
    }

    useEffect(() => {
        
        api.get<GenreResponseProps>(`genres/${props.selectedGenreId}`).then(response => {
        setSelectedGenre(response.data);
        })
    }, [props.selectedGenreId])

    return (
        <header>
            <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
        </header>
    );
}