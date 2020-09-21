import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  makeStyles
} from '@material-ui/core';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import PerformanceOverTime from './PerformanceOverTime';

const useStyles = makeStyles((theme) => ({
  root: {},
  cell: {
    padding: theme.spacing(1)
  }
}));

const Monitoring = ({ className, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Monitoring (WIP)" />
      <Divider />
      <CardContent>
        <Box mt={2}>
          <PerformanceOverTime/>
        </Box>
        <Box mt={2}>
          <PerformanceOverTime/>
        </Box>
      </CardContent>
    </Card>
  );
};

Monitoring.propTypes = {
  className: PropTypes.string,
};

export default Monitoring;
