import React, { useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Typography,
  makeStyles, fade
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import api from '../../../api';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
import useAuth from '../../../hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {},
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
  }
}));

const Header = ({ className, job, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { user } = useAuth();

  const onStop = useCallback(async () => {
    try {
      await user.firebaseUser.getIdToken().then((idToken) => {
        api.setToken(idToken);
      });
      await api.quitJob(job.jobId).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  const onDelete = useCallback(async () => {
    try {
      await user.firebaseUser.getIdToken().then((idToken) => {
        api.setToken(idToken);
      });
      await api.deleteJob(job.jobId).then((res) => {
        console.log(res);
      });
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  return (
    <Grid
      container
      spacing={3}
      justify="space-between"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small"/>}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
          <Link
            variant="body1"
            color="inherit"
            to="/app/management"
            component={RouterLink}
          >
            Management
          </Link>
          <Typography
            variant="body1"
            color="textPrimary"
          >
            Jobs
          </Typography>
        </Breadcrumbs>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          {job.designName}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          className={job.status === 'completed' || job.status === 'stopped' || job.status === 'stopping' || job.status === 'failed' ? '' : classes.warning}
          size="small"
          startIcon={<StopIcon/>}
          disabled={job.status === 'completed' || job.status === 'stopped' || job.status === 'stopping' || job.status === 'failed'}
          onClick={() => onStop()}
        >
          Stop
        </Button>
        <Button
          size="small"
          className={job.status !== 'completed' && job.status !== 'stopped' && job.status !== 'failed' ? '' : classes.error}
          startIcon={<DeleteIcon/>}
          disabled={job.status !== 'completed' && job.status !== 'stopped' && job.status !== 'failed'}
          onClick={() => onDelete()}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  job: PropTypes.object.isRequired
};

export default Header;
