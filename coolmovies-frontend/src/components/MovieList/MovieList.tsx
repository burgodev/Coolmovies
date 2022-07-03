import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { makeStyles, createStyles } from '@mui/styles';
import { Card, Theme, Grid, Skeleton, Box, Typography } from '@mui/material';

import { Snackbar } from '../';
import { ISnackbar } from '../../types/typings';

import { Movie } from '../../types/typings';
import {
  moviesActions,
  reviewsActions,
  useAppDispatch,
  useAppSelector,
} from '../../redux';

const MovieList = () => {
  const classes = useStyles();
  const router = useRouter();
  const [snackbar, setSnackbar] = useState<
    Pick<ISnackbar, 'message' | 'severity' | 'open'>
  >({
    severity: 'warning',
    message: '',
    open: false,
  });
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.movies);
  const reviewData = useAppSelector((state) => state.reviews?.data);

  useEffect(() => {
    dispatch(moviesActions.loading());
    dispatch(moviesActions.fetch());
  }, [dispatch]);

  const selectMovie = (movie: Movie) => {
    dispatch(reviewsActions.loading());
    dispatch(reviewsActions.fetch(movie));
    router.push('/reviews');
  };

  useEffect(() => {
    console.log('error', error);
    if (error)
      setSnackbar({
        open: true,
        severity: 'error',
        message: error,
      });
  }, [error]);

  if (loading) return <SkeletonMovieList />;

  return (
    <section className={classes.section}>
      {!reviewData?.movie.id && (
        <Box className={classes.selectMovie}>
          <Typography variant={'h2'}>{'Select a movie'}</Typography>
        </Box>
      )}

      <Grid container spacing={2} className={classes.grid} data-testid='grid'>
        {data?.map((movie) => (
          <Grid
            key={movie.id}
            item
            xs={12}
            md={6}
            lg={4}
            xl={3}
            className={classes.item}>
            <Card
              key={movie.id}
              data-testid='card'
              className={classes.card}
              onClick={() => selectMovie(movie)}
              style={{
                backgroundImage: `url(${movie.imgUrl})`,
              }}
            />
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        severity={snackbar.severity}
        message={snackbar.message}
        onClose={() =>
          setSnackbar({
            open: false,
            severity: snackbar.severity,
            message: snackbar.message,
          })
        }
      />
    </section>
  );
};

const SkeletonMovieList = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} data-testid='skeleton' className={classes.grid}>
      {[0, 1, 2, 4].map((id) => (
        <Grid
          key={id}
          item
          xs={12}
          md={6}
          lg={4}
          xl={3}
          className={classes.item}>
          <Skeleton width={'100%'} height={500} />
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      backgroundSize: 'cover',
      height: 500,
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: '0.3s',
      '&:hover': {
        opacity: 0.5,
        transitionTimingFunction: 'ease-out',
        transform: 'scale(1.05)',
        transition: '0.3s',
      },
    },
    selectMovie: {
      padding: '0px 32px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    grid: {
      padding: '40px 0',
      margin: '0 auto !important',
      width: '75%',
      maxWidth: 1536,
      [theme.breakpoints.down('xl')]: {
        width: '85%',
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
    item: {
      [theme.breakpoints.down('sm')]: {
        padding: '8px 4px 0 !important',
      },
    },
    section: {
      width: '100%',
    },
  })
);

export default MovieList;
