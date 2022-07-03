import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';
import {
  createUserMutation,
  createReviewMutation,
  updateReviewMutation,
  getReviewsQuery,
} from './queries';

export const create: Epic = (
  action$: Observable<SliceAction['create']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.create.match),
    switchMap(async (values: any) => {
      try {
        const { data: userData } = await client.mutate({
          mutation: createUserMutation,
          variables: {
            name: values.payload.userByUserReviewerId.name,
          },
        });

        const { data: reviewData } = await client.mutate({
          mutation: createReviewMutation,
          variables: {
            body: values.payload.body,
            rating: values.payload.rating,
            title: values.payload.title,
            movieId: state$.value.reviews.data?.movie.id!,
            userReviewerId: userData.createUser.user.id,
          },
        });

        return actions.loaded({
          data: {
            reviews: [
              ...state$.value.reviews.data?.reviews!,
              reviewData.createMovieReview.movieReview,
            ]!,
            movie: state$.value.reviews.data?.movie!,
          },
          success: 'create',
        });
      } catch (err) {
        return actions.loadError(err);
      }
    })
  );

export const update: Epic = (
  action$: Observable<SliceAction['update']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.update.match),
    switchMap(async (values: any) => {
      try {
        const { data } = await client.mutate({
          mutation: updateReviewMutation,
          variables: {
            nodeId: values.payload.id,
            body: values.payload.body,
            rating: values.payload.rating,
            title: values.payload.title,
          },
        });

        const arr = state$.value.reviews.data?.reviews.map((review) => {
          if (review.id === data.updateMovieReviewById.movieReview.id) {
            return {
              ...review,
              ...data.updateMovieReviewById.movieReview,
            };
          } else return review;
        });

        return actions.loaded({
          data: {
            reviews: arr!,
            movie: state$.value.reviews.data?.movie!,
          },
          success: 'update',
        });
      } catch (err) {
        return actions.loadError(err);
      }
    })
  );

export const fetch: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async (movie) => {
      try {
        const { data } = await client.query({
          query: getReviewsQuery,
          variables: {
            movieId: movie?.payload?.id,
          },
        });

        return actions.loaded({
          data: {
            reviews: data.allMovieReviews.nodes,
            movie: movie.payload!,
          },
        });
      } catch (err) {
        return actions.loadError(err);
      }
    })
  );
