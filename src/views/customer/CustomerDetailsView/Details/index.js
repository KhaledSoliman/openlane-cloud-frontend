import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import CustomerInfo from './CustomerInfo';
import Emails from './Emails';
import Invoices from './Invoices';
import OtherActions from './OtherActions';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Details = ({
  job,
  className,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      spacing={3}
      {...rest}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <CustomerInfo job={job} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Invoices job={job} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <Emails />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <OtherActions />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  job: PropTypes.object.isRequired
};

export default Details;
