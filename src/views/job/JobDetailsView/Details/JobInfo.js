import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  makeStyles
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import PersonIcon from '@material-ui/icons/PersonOutline';
import { getStatusLabel, getTypeLabel } from 'src/constants/jobConstants';
import moment from 'moment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import getSinceTime from 'src/utils/getSince';

export const jobFields = [
  { id: 'jobId', numeric: false, disablePadding: false, label: 'Job Id' },
  { id: 'designName', numeric: false, disablePadding: false, label: 'Design Name' },
  {
    id: 'type', numeric: false, disablePadding: false, label: 'Type', jsx: (job) => {
      return getTypeLabel(job.type);
    }
  },
  {
    id: 'status', numeric: false, disablePadding: false, label: 'Status', jsx: (job) => {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="left"
        >
          <Box flexShrink={1}>{getStatusLabel(job.status)}</Box>
          <Box display="flex" alignItems="center" flexShrink={1}>
            <AccessTimeIcon fontSize="small"/>
            <Box ml={1}>
              <Typography variant="overline" color="textSecondary">{getSinceTime(job.updatedAt)}</Typography>
            </Box>
          </Box>
        </Box>);
    }
  },
  { id: 'repoURL', numeric: false, disablePadding: false, label: 'Repo URL', link: true },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Submission Time', timestamp: true },
  { id: 'completedAt', numeric: false, disablePadding: false, label: 'Completion Time', timestamp: true }
];

const useStyles = makeStyles((theme) => ({
  root: {},
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

const JobInfo = ({
                   job,
                   className,
                   ...rest
                 }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Job info"/>
      <Divider/>
      <Table>
        <TableBody>
          {jobFields.map((cell, i) => (
            <TableRow key={i}>
              <TableCell
                align={cell.numeric ? 'right' : 'left'}
                padding={cell.disablePadding ? 'none' : 'default'}
              >
                {cell.label}
              </TableCell>
              <TableCell>
                {cell.jsx ? cell.jsx(job) :
                  cell.timestamp ?
                    <Typography variant="body2" color="textSecondary">
                      {job[cell.id] ? moment(job[cell.id]).format('DD MMM YYYY | hh:mm') : 'N/A'}
                    </Typography>
                    : job[cell.id]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

JobInfo.propTypes = {
  className: PropTypes.string,
  job: PropTypes.object.isRequired
};

export default JobInfo;
