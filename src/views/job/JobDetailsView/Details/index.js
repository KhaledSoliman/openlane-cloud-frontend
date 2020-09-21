import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid, makeStyles } from '@material-ui/core';
import JobInfo from './JobInfo';
import Monitoring from './Monitoring';
import StatusAndResources from './StatusAndResources';
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
        lg={6}
        md={6}
        xl={3}
        xs={12}
      >
        <JobInfo job={job} />
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={3}
        xs={12}
      >
        <StatusAndResources job={job} />
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xl={3}
        xs={12}
      >
        <Monitoring />
      </Grid>
    </Grid>
  );
};

Details.propTypes = {
  className: PropTypes.string,
  job: PropTypes.object.isRequired
};

export default Details;
