import type { NextPage } from 'next';

import { Typography } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';

import { MovieList, Header } from '../components';

const Home: NextPage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Header />

      <div className={classes.body}>
        <Typography variant={'h1'} className={classes.heading}>
          {'Coolmovies Reviews'}
        </Typography>

        <MovieList />
      </div>
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
    heading: {
      marginTop: 16,
      fontSize: '2.75rem',
      textAlign: 'center',
    },
  })
);

export default Home;
