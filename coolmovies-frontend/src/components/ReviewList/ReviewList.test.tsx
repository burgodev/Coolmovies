import { render, screen } from '@testing-library/react';
import ReviewList from './ReviewList';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../utils/theme';

const renderReviewList = () => {
  const mockStore = configureStore();
  let store: any;

  store = mockStore(INITIAL_STATE);

  render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ReviewList />
      </ThemeProvider>
    </Provider>
  );
};

describe('ReviewList Component', () => {
  it('should have a title', () => {
    renderReviewList();

    expect(screen.getByTestId('title')).toBeInTheDocument();
  });

  it('should have an edit icon', () => {
    renderReviewList();

    expect(
      screen.getByTestId('editIcon')
    ).toBeInTheDocument();
  });

  it('should have an user name', () => {
    renderReviewList();

    expect(
      screen.getByTestId('username')
    ).toBeInTheDocument();
  });

  it('should have a rating', () => {
    renderReviewList();

    expect(
      screen.getByTestId('rating')
    ).toBeInTheDocument();
  });

  it('should have a body', () => {
    renderReviewList();

    expect(screen.getByTestId('body')).toBeInTheDocument();
  });

  it('should have a button addNewReview', () => {
    renderReviewList();

    expect(
      screen.getByTestId('addNewReview')
    ).toBeInTheDocument();
  });
});

const INITIAL_STATE = {
  reviews: {
    data: {
      movie: {
        id: 'b8d93229-e02a-4060-9370-3e073ada86c3',
        imgUrl:
          'https://images-na.ssl-images-amazon.com/images/I/81aA7hEEykL.jpg',
        title: 'Star Wars: A New Hope',
        releaseDate: '1977-05-25',
        movieDirectorByMovieDirectorId: {
          __typename: 'MovieDirector',
          name: 'George Lucas',
        },
      },
      reviews: [
        {
          __typename: 'MovieReview',
          id: '0ab75df3-4019-4f38-b95e-979d86fcfc1e',
          rating: 5,
          title: 'AWESOME MOVIE',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget mollis massa, in semper purus. Nullam porttitor odio fermentum blandit rhoncus. In hac habitasse platea dictumst. Vestibulum fringilla sagittis nunc, non pulvinar .',
          userByUserReviewerId: {
            name: 'Ayla',
            id: '65549e6a-2389-42c5-909a-4475fdbb3e69',
          },
        },
      ],
    },
  },
};
