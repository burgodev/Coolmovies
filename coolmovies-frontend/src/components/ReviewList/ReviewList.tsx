import React, { useState } from 'react';

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

import { ModalReview, IconEdit } from '..';
import { useAppSelector } from '../../redux';
import { Review } from '../../types/typings';

const ReviewList = () => {
  const classes = useStyles();
  const [openModalReview, setOpenModalReview] = useState<boolean>(false);
  const [review, setReview] = useState<Review | null>();
  const { data, loading } = useAppSelector((state) => state.reviews);

  if (loading) return <SkeletonReviews />;

  return (
    <section>
      <Container maxWidth='xl' className={classes.container}>
        {data?.reviews.map((review: any) => (
          <article key={review.id} className={classes.article}>
            <Box className={classes.review}>
              <Box className={classes.flex}>
                <Typography
                  variant={'h4'}
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

              <Typography data-testid='username'>
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
          {'Add new review'}
        </Button>

        <ModalReview
          open={openModalReview}
          onClose={() => (setOpenModalReview(false), setReview(null))}
          review={review ?? null}
        />
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
    container: {
      margin: '32px auto',
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
      gap: 12,
    },

    title: {
      marginRight: '20px',
      textAlign: 'center',
    },

    rating: {
      marginBottom: 40,
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
