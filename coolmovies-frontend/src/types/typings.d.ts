export interface Movie {
  id: string;
  imgUrl: string;
  title: string;
  releaseDate: string;
  movieDirectorByMovieDirectorId: {
    name: string;
  };
}
