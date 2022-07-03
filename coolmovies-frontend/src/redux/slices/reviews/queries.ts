import { gql } from '@apollo/client';

export const getReviewsQuery = gql`
  query getReviews($movieId: UUID!) {
    allMovieReviews(filter: { movieId: { equalTo: $movieId } }) {
      nodes {
        id
        rating
        title
        body
        userByUserReviewerId {
          name
          id
        }
      }
    }
  }
`;

export const updateReviewMutation = gql`
  mutation updateReview(
    $nodeId: UUID!
    $body: String
    $rating: Int
    $title: String
  ) {
    updateMovieReviewById(
      input: {
        movieReviewPatch: { body: $body, rating: $rating, title: $title }
        id: $nodeId
      }
    ) {
      movieReview {
        id
        body
        rating
        title
        userByUserReviewerId {
          name
          id
        }
      }
    }
  }
`;

export const createUserMutation = gql`
  mutation createUser($name: String!) {
    createUser(input: { user: { name: $name } }) {
      user {
        id
      }
    }
  }
`;

export const createReviewMutation = gql`
  mutation createReview(
    $title: String!
    $movieId: UUID!
    $userReviewerId: UUID!
    $body: String
    $rating: Int
  ) {
    createMovieReview(
      input: {
        movieReview: {
          title: $title
          movieId: $movieId
          userReviewerId: $userReviewerId
          body: $body
          rating: $rating
        }
      }
    ) {
      movieReview {
        id
        body
        rating
        title
        userByUserReviewerId {
          name
          id
        }
      }
    }
  }
`;
