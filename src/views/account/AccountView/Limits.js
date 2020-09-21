import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Paper,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles((theme) => ({
  root: {},
  overview: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    }
  },
  productImage: {
    marginRight: theme.spacing(1),
    height: 48,
    width: 48
  },
  details: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  }
}));

const Limits = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [subscription, setSubscription] = useState(null);

  const getSubscription = useCallback(async () => {
    try {
      const response = await axios.get('/api/account/subscription');

      if (isMountedRef.current) {
        setSubscription(response.data.subscription);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getSubscription();
  }, [getSubscription]);

  if (!subscription) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Limits" />
      <Divider />
      <CardContent>
        <Paper variant="outlined">
          <Divider />
          <Box className={classes.details}>
            <div>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                {`Job concurrency: 1`}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                {`Job total submissions: unlimited`}
              </Typography>
            </div>
            <div>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                {`CPUs: based on job type`}
              </Typography>
              <Typography
                variant="body2"
                color="textPrimary"
              >
                {`RAM: based on job type`}
              </Typography>
            </div>
          </Box>
        </Paper>
        <Box
          mt={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            disabled
            size="small"
            color="secondary"
            variant="contained"
          >
            Change limit Request
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

Limits.propTypes = {
  className: PropTypes.string
};

export default Limits;
