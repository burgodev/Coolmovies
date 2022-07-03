import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';

import { reviewsActions, useAppDispatch, useAppSelector } from '../../redux';
import { makeStyles, createStyles } from '@mui/styles';
import {
  Rating,
  Theme,
  Button,
  Typography,
  TextField,
  DialogContent,
  DialogActions,
  FormHelperText,
  DialogTitle,
  Box,
  Dialog,
} from '@mui/material';

import { Review } from '../../types/typings';

interface Props {
  open: boolean;
  review: Review | null;
  onClose: (close: boolean) => void;
}

const ModalReview = ({ open, review, onClose }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const classes = useStyles();
  const { loading } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (review?.id) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [review]);

  const handleSubmit = async (values: any) => {
    dispatch(reviewsActions.loading());
    edit
      ? await dispatch(reviewsActions.update(values))
      : await dispatch(reviewsActions.create(values));

    onClose(true);
  };

  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      maxWidth='lg'
      open={open}
      onClose={onClose}>
      <Formik
        initialValues={review ?? initialValues}
        onSubmit={handleSubmit}
        validate={(values) => validate(values)}
        enableReinitialize>
        {(formik) => (
          <Form onSubmit={formik.handleSubmit}>
            <DialogTitle>{edit ? 'Edit review' : 'Create review'}</DialogTitle>
            <DialogContent>
              <TextField
                className={classes.field}
                disabled={edit}
                variant='outlined'
                fullWidth
                id='name'
                name={'userByUserReviewerId.name'}
                label='Name'
                placeholder='John Doe'
                value={formik.values.userByUserReviewerId?.name}
                onChange={formik.handleChange}
                error={
                  formik.touched.userByUserReviewerId?.name &&
                  Boolean(formik.errors.userByUserReviewerId?.name)
                }
                helperText={
                  formik.touched.userByUserReviewerId?.name &&
                  formik.errors.userByUserReviewerId?.name
                }
              />

              <TextField
                className={classes.field}
                variant='outlined'
                fullWidth
                id='textfield-title'
                name='title'
                label='Title'
                placeholder='Awesome movie!'
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />

              <TextField
                className={classes.field}
                variant='outlined'
                fullWidth
                id='textfield-body'
                name='body'
                label='Description'
                multiline
                rows={8}
                value={formik.values.body}
                onChange={formik.handleChange}
                error={formik.touched.body && Boolean(formik.errors.body)}
                helperText={formik.touched.body && formik.errors.body}
              />

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                <Typography className={classes.typography}>Rating</Typography>
                <Rating
                  data-testid='rating'
                  size='large'
                  name='simple-controlled'
                  value={formik.values.rating}
                  onChange={(event, newValue) => {
                    formik.setFieldValue('rating', newValue);
                  }}
                />
                <FormHelperText
                  className={classes.ratingErrorText}
                  error={true}>
                  {formik.errors.rating}
                </FormHelperText>
              </Box>
            </DialogContent>
            <DialogActions className={classes.actions}>
              <Button
                type='submit'
                data-testid='button'
                className={classes.button}
                variant='contained'
                disabled={loading}>
                {edit ? 'Edit review' : 'Create review'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

const initialValues = {
  userByUserReviewerId: {
    name: '',
    id: '',
  },
  title: '',
  body: '',
  rating: 0,
};

const validate = (values: Review) => {
  let errors: any = {};

  if (!values.userByUserReviewerId.name) {
    errors = {
      userByUserReviewerId: { name: 'Enter your name' },
    };
  }
  if (!values.title) {
    errors.title = 'Choose a title';
  }
  if (!values.body) {
    errors.body = 'Please type a body';
  }
  if (values.rating === 0) {
    errors.rating = 'Choose a rating';
  }

  return errors;
};

export default ModalReview;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 600,
      padding: '32px',
      [theme.breakpoints.down('sm')]: {
        width: '80vw',
        padding: '8px',
      },
    },
    button: {
      width: '100%',
    },
    actions: {
      padding: '0 24px 16px !important',
    },
    content: {
      gap: 24,
      display: 'flex',
      flexDirection: 'column',
    },

    typography: {
      marginLeft: 4,
      marginBottom: 4,
    },
    ratingErrorText: {
      marginLeft: 6,
    },
    paper: {
      borderRadius: 20,
      width: '540px',
      padding: '16px 16px 8px',
    },
    field: {
      margin: '8px 0 !important',
    },
  })
);
