import { actorsMovieDTO } from "../actors/actors.model";
import { genreDTO } from "../genres/genres.model";
import { movieTheaterDTO } from "../movie-theaters/movie-theaters.model";

export interface movieCreationDTO {
  title: string;
  summary: string;
  poster: File;
  inTheaters: boolean;
  releaseDate: Date;
  trailer: string;
  genresIds: number[];
  movieTheatersIds: number[];
  actors: actorsMovieDTO[];
}

export interface movieDTO {
  id: number;
  title: string;
  summary: string;
  poster: string;
  inTheaters: boolean;
  releaseDate: Date;
  trailer: string;
  genres: genreDTO[];
  movieTheaters: movieTheaterDTO[];
  actors: actorsMovieDTO[];
  averagerVote: number;
  userVote: number;
}

export interface MoviePostGetDTO{
  genres: genreDTO[];
  movieTheaters: movieTheaterDTO[];
}

export interface homeDTO{
  inTheaters: movieDTO[];
  upcomingReleases: movieDTO[];
}

export interface MoviePutGetDTO{
  movie: movieDTO;
  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];
  selectedMovieTheaters: movieTheaterDTO[];
  nonSelectedMovieTheaters: movieTheaterDTO[];
  actors: actorsMovieDTO[];
}