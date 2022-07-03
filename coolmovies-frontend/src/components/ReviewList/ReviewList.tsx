import React, { useState } from 'react';

import { useAppSelector } from '../../redux';

import { makeStyles, createStyles } from '@mui/styles';
import {
  Button,
  Typography,
  Rating,
  Theme,
  Box,
  Container,
  Skeleton,
} from '@mui/material';

import { IconEdit } from '..';
import { Review } from '../../types/typings';

const ReviewList = () => {
  const classes = useStyles();

  const [openModalReview, setOpenModalReview] = useState<boolean>(false);

  const [review, setReview] = useState<Review | null>();

  const { data, loading } = useAppSelector((state) => state.reviews);

  if (loading) return <SkeletonReviews />;

  return (
    <section>
      <Container maxWidth='xl' className={classes.reviews}>
        {data?.reviews.map((review: any) => (
          <article key={review.id} className={classes.article}>
            <Box className={classes.review}>
              <Box className={classes.flex}>
                <Typography
                  variant={'h3'}
                  data-testid='title'
                  className={classes.title}>
                  {review.title}
                </Typography>
                <IconEdit
                  size={30}
                  data-testid='editIcon'
                  onClick={() => (setOpenModalReview(true), setReview(review))}
                />
              </Box>

              <Typography
                variant={'caption'}
                data-testid='username'
                className={classes.name}>
                {review.userByUserReviewerId.name}
              </Typography>

              <Rating
                className={classes.rating}
                name='read-only'
                data-testid='rating'
                value={review.rating}
                readOnly
              />

              <Typography paragraph data-testid='body'>
                {review.body}
              </Typography>
            </Box>
          </article>
        ))}

        <Button
          variant='contained'
          data-testid='addNewReview'
          className={classes.button}
          onClick={() => (setOpenModalReview(true), setReview(initialValues))}>
          Add new review
        </Button>

        {/* <ModalReview
          open={openModalReview}
          onClose={() => (setOpenModalReview(false), setReview(null))}
          review={review ?? null}
        /> */}
      </Container>
    </section>
  );
};

const initialValues: Review = {
  userByUserReviewerId: {
    name: '',
    id: '',
  },
  title: '',
  body: '',
  rating: 0,
};

const SkeletonReviews = () => {
  const classes = useStyles();
  return (
    <Skeleton
      data-testid='loading'
      className={classes.skeleton}
      width={'50%'}
      height={800}
    />
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    review: {
      margin: '24px auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: '20px',
      border: `solid 1px ${theme.palette.divider}`,
      width: '75%',
      padding: '24px 60px',
      [theme.breakpoints.down('lg')]: {
        width: '100%',
        padding: '24px 40px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        padding: '24px',
      },
    },
    reviews: {
      margin: '32px auto',
      display: 'flex !important',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    movie: {
      margin: '32px auto 0px',
      display: 'flex !important',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },

    button: {
      width: 320,
      height: 52,
      marginTop: 16,
    },
    flex: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    title: {
      fontSize: '2.5rem !important',
      marginRight: '20px !important',
      textAlign: 'center',
    },
    name: {
      fontSize: '1.25rem !important',
      fontWeight: 400,
    },
    rating: {
      marginBottom: 40,
    },

    date: {
      fontSize: '2rem !important',
    },

    article: {
      width: '100%',
    },
    skeleton: {
      margin: '0 auto',
    },
  })
);

export default ReviewList;
