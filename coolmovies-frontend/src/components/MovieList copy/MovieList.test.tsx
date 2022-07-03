import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../utils/theme';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('Movies Component', () => {
  it('should have a skeleton', () => {
    const mockStore = configureStore();
    let store: any;

    store = mockStore(EMPTY_STATE);

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MovieList />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.getByTestId('skeleton')
    ).toBeInTheDocument();
  });

  it('should have a grid', () => {
    const mockStore = configureStore();
    let store: any;

    store = mockStore(INITIAL_STATE);

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <MovieList />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByTestId('grid')).toBeInTheDocument();
  });
});

const INITIAL_STATE = {
  movies: {
    data: [
      {
        id: '70351289-8756-4101-bf9a-37fc8c7a82cd',
        imgUrl:
          'https://upload.wikimedia.org/wikipedia/en/d/d4/Rogue_One%2C_A_Star_Wars_Story_poster.png',
        title: 'Rogue One: A Star Wars Story',
        releaseDate: 2016 - 12 - 16,
        movieDirectorByMovieDirectorId: {
          name: 'Gareth Edwards',
        },
      },
      {
        id: 'b8d93229-e02a-4060-9370-3e073ada86c3',
        imgUrl:
          'https://images-na.ssl-images-amazon.com/images/I/81aA7hEEykL.jpg',
        title: 'Star Wars: A New Hope',
        releaseDate: '1977-05-25',
        movieDirectorByMovieDirectorId: {
          name: 'George Lucas',
        },
      },
    ],
  },
};

const EMPTY_STATE = {
  movies: {
    data: undefined,
    loading: true,
  },
};
