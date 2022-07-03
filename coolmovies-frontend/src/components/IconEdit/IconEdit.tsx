import React from 'react';

import { makeStyles, createStyles } from '@mui/styles';

interface Props {
  size: number;
  onClick: () => void;
}

const IconEdit = ({ size, onClick, ...props }: Props) => {
  const classes = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-testid="svg"
      width={size}
      height={size}
      fill="#f2f2f2"
      viewBox="0 0 16 16"
      onClick={onClick}
      className={classes.icon}
      {...props}>
      <path d="M4.276 10.667l6.761-6.762-.942-.942-6.762 6.761v.943h.943zM4.829 12H2V9.171l7.623-7.623a.667.667 0 01.943 0l1.886 1.886a.667.667 0 010 .943L4.829 12zM2 13.333h12v1.334H2v-1.334z"></path>
    </svg>
  );
};

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      cursor: 'pointer',
      transition: '0.25s',

      '&:hover': {
        transform: 'scale(1.10)',
      },
    },
  })
);

export default IconEdit;
