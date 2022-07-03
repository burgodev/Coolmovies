import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const moviesAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetch']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetch.match),
    switchMap(async () => {
      try {
        const { data } = await client.query({
          query: moviesQuery,
        });
        return actions.loaded({
          data: data.allMovies.nodes,
        });
      } catch (err) {
        return actions.loadError(err);
      }
    })
  );

export const moviesQuery = gql`
  query AllMovies {
    allMovies {
      nodes {
        id
        imgUrl
        title
        releaseDate
        movieDirectorByMovieDirectorId {
          name
        }
      }
    }
  }
`;
