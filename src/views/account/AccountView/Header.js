import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Typography,
  Breadcrumbs,
  Link,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small"/>}
        aria-label="breadcrumb"
      >
        <Link color="inherit" to="/app" component={RouterLink}>
          Dashboard
        </Link>
        <Typography color="textPrimary">
          Account
        </Typography>
      </Breadcrumbs>
      <Box p={2}>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          Settings
        </Typography>
      </Box>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
