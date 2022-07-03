import React from 'react';
import Link from 'next/link';

import { makeStyles, createStyles } from '@mui/styles';
import { Typography, Paper, Theme } from '@mui/material';

const Header = () => {
  const classes = useStyles();

  return (
    <header className={classes.header}>
      <Paper elevation={3} className={classes.paper}>
        <Link href='/'>
          <a className={classes.link}>
            <Typography>{'Cool Movies'}</Typography>
          </a>
        </Link>
      </Paper>
    </header>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    link: {
      textDecoration: 'none',
      fontSize: '1.5rem',
      color: theme.palette.primary.main,
    },
    header: {
      width: '100%',
    },
    paper: {
      height: 50,
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      padding: 16,
      borderRadius: 0,
      p: {
        color: 'white',
      },
    },
  })
);

export default Header;
