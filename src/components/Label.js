import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily,
    alignItems: 'center',
    borderRadius: 2,
    display: 'inline-flex',
    flexGrow: 0,
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightMedium,
    height: 20,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    padding: theme.spacing(0.5, 1),
    textTransform: 'uppercase'
  },
  primary: {
    color: theme.palette.primary.main,
    backgroundColor: fade(theme.palette.primary.main, 0.08)
  },
  secondary: {
    color: theme.palette.secondary.main,
    backgroundColor: fade(theme.palette.secondary.main, 0.08)
  },
  error: {
    color: theme.palette.error.main,
    backgroundColor: fade(theme.palette.error.main, 0.08)
  },
  success: {
    color: theme.palette.success.main,
    backgroundColor: fade(theme.palette.success.main, 0.08)
  },
  warning: {
    color: theme.palette.warning.main,
    backgroundColor: fade(theme.palette.warning.main, 0.08)
  },
  normal: {
    color: '#cbcbcb',
    backgroundColor: fade(theme.palette.warning.main, 0.08)
  },
  exploratory: {
    color: '#ffb700',
    backgroundColor: fade(theme.palette.warning.main, 0.08)
  },
  archiving: {
    color: '#607D8B',
    backgroundColor: fade(theme.palette.warning.main, 0.08)
  },
  running: {
    color: '#007ADF',
    backgroundColor: fade(theme.palette.warning.main, 0.08)
  },
  synthesis: {
    color: '#E9967A',
    backgroundColor: fade('#E9967A', 0.08)
  },
  floorplan: {
    color: '#2F4F4F',
    backgroundColor: fade('#2F4F4F', 0.08)
  },
  placement: {
    color: '#483D8B',
    backgroundColor: fade('#483D8B', 0.08)
  }, cts: {
    color: '#B8860B',
    backgroundColor: fade('#B8860B', 0.08)
  },
  routing: {
    color: '#a1ff00',
    backgroundColor: fade('#a1ff00', 0.08)
  },
  lvs: {
    color: '#0037cb',
    backgroundColor: fade('#0037cb', 0.08)
  },
  magic: {
    color: '#ad00ad',
    backgroundColor: fade('#ad00ad', 0.08)
  }


}));

const Label = ({
                 className = '',
                 color = 'secondary',
                 children,
                 style,
                 ...rest
               }) => {
  const classes = useStyles();

  return (
    <span
      className={
        clsx(classes.root, {
          [classes[color]]: color
        }, className)
      }
      {...rest}
    >
      {children}
    </span>
  );
};

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.string
};

export default Label;
