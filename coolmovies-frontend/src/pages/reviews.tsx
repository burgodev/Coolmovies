import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';

import { makeStyles, createStyles } from '@mui/styles';
import { useAppSelector } from '../redux';

import { ISnackbar } from '../types/typings';
import {
  MovieList,
  ReviewList,
  Header,
  MovieInfo,
  Snackbar,
} from '../components';

const Reviews: NextPage = () => {
  const classes = useStyles();
  const [snackbar, setSnackbar] = useState<
    Pick<ISnackbar, 'message' | 'severity' | 'open'>
  >({
    severity: 'warning',
    message: '',
    open: false,
  });
  const { data, loading, error, success } = useAppSelector(
    (state) => state.reviews
  );

  useEffect(() => {
    if (error)
      setSnackbar({
        open: true,
        severity: 'error',
        message: error,
      });
  }, [error]);

  useEffect(() => {
    if (success === 'create')
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Review created successfully',
      });
    else if (success === 'update')
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Review successfully updated',
      });
  }, [success]);

  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.body}>
        {(data?.movie.id || loading) && (
          <>
            <MovieInfo />
            <ReviewList />
          </>
        )}

        <MovieList />
      </div>
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
    </div>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },

    body: {
      alignSelf: 'stretch',
      padding: 32,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
    },
  })
);

export default Reviews;
