export interface Movie {
  id: string;
  imgUrl: string;
  title: string;
  releaseDate: string;
  movieDirectorByMovieDirectorId: {
    name: string;
  };
}

export interface Review {
  id?: string;
  body: string;
  title: string;
  rating: number;
  userByUserReviewerId: {
    name: string;
    id: string;
  };
  commentsByMovieReviewId?: {
    nodes: [];
  };
}

export interface ISnackbar {
  severity: 'error' | 'info' | 'success' | 'warning';
  message: string;
  open: boolean;

  onClose: () => void;
}
