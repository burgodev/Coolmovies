import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { makeStyles, createStyles } from '@mui/styles';
import { Typography, Rating, Theme, Container, Skeleton } from '@mui/material';

import { useAppSelector } from '../../redux';

const MovieInfo = () => {
  const classes = useStyles();
  const [rating, setRating] = useState<number>(0);
  const { data, loading } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (data?.reviews.length) {
      const rating =
        Number(
          data?.reviews.reduce((prev: any, current: any) => {
            let aux;
            if (typeof prev === 'object') {
              aux = prev.rating + current.rating;
            } else {
              aux = prev + current.rating;
            }
            return aux;
          })
        ) / data?.reviews.length;

      setRating(rating);
    }
  }, [data]);

  if (loading) return <SkeletonReviews />;

  return (
    <section className={classes.section}>
      <Container maxWidth='xl'>
        <article className={classes.article}>
          <div className={classes.imgContainer}>
            <Image
              src={data?.movie.imgUrl!}
              alt='banner'
              className={classes.img}
              data-testid='image'
              layout='fill'
            />
          </div>
          <Typography
            variant={'h1'}
            data-testid='title'
            className={classes.title}>
            {data?.movie?.title}
          </Typography>{' '}
          <Typography variant={'h2'} data-testid='date'>{` (${
            new Date(data?.movie.releaseDate ?? '')
              .toLocaleString()
              .split(' ')[0]
          })`}</Typography>
          <Typography variant={'subtitle1'} data-testid='director'>
            {data?.movie?.movieDirectorByMovieDirectorId.name}
          </Typography>
          <Rating
            name='read-only'
            value={rating}
            readOnly
            precision={0.5}
            size='large'
          />
        </article>
      </Container>
    </section>
  );
};

const SkeletonReviews = () => {
  const classes = useStyles();
  return (
    <Skeleton
      data-testid='skeleton'
      className={classes.skeleton}
      width={'75%'}
      height={800}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    article: {
      margin: '32px auto 0px',
      display: 'flex !important',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    title: {
      textAlign: 'center',
    },
    skeleton: {
      margin: '0 auto',
    },
    imgContainer: {
      position: 'relative',
      height: 600,
      margin: '16px 0 40px',
      width: '100%',
      [theme.breakpoints.down('lg')]: {
        width: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    img: {
      objectFit: 'cover',
    },
    section: {
      width: '100%',
    },
  })
);

export default MovieInfo;
