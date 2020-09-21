import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles, Typography, TextField, InputAdornment, Checkbox
} from '@material-ui/core';
import { ArrowRight as ArrowRightIcon } from 'react-feather';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Label from 'src/components/Label';
import { getStatusLabel } from 'src/constants/jobConstants';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import getSinceTime from 'src/utils/getSince';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import FilterListIcon from '@material-ui/icons/FilterList';
import { applyPagination, applySort } from 'src/utils/sortingAndPagination';
import RunDownloadButton from './RunDownloadButton';

const runFields = [
  { id: 'id', numeric: false, disablePadding: false, label: 'Run Id' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Run Name' },
  {
    id: 'status', numeric: false, disablePadding: false, label: 'Status', jsx: (run) => {
      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="left"
        >
          <Box flexShrink={1}>{getStatusLabel(run.status)}</Box>
          <Box display="flex" alignItems="center" flexShrink={1}>
            <AccessTimeIcon fontSize="small"/>
            <Box ml={1}>
              <Typography variant="overline" color="textSecondary">{getSinceTime(run.updatedAt)}</Typography>
            </Box>
          </Box>
        </Box>);
    }
  },
  { id: 'createdAt', numeric: false, disablePadding: false, label: 'Start Time', timestamp: true },
  { id: 'completedAt', numeric: false, disablePadding: false, label: 'Completion Time', timestamp: true },
  {
    id: 'overflow', numeric: false, disablePadding: false, label: '', jsx: (run) => {
      return (<RunDownloadButton run={run}/>);
    }
  }
];

const sortOptions = [
  {
    value: 'updatedAt|desc',
    label: 'Last update (newest first)'
  },
  {
    value: 'updatedAt|asc',
    label: 'Last update (oldest first)'
  },
];

const useStyles = makeStyles(() => ({
  root: {},
  queryField: {
    width: 500
  }
}));

const Runs = ({ className, runs, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [invoices, setInvoices] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState(sortOptions[0].value);
  const [query, setQuery] = useState('');


  const handleQueryChange = (event) => {
    event.persist();
    setQuery(event.target.value);
  };

  const handleSortChange = (event) => {
    event.persist();
    setSort(event.target.value);
  };

  const handleRequestSort = (event, property) => {
    const [orderBy, order] = sort.split('|');
    const isAsc = orderBy === property && order === 'asc';
    setSort(`${property}|${isAsc ? 'desc' : 'asc'}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const getInvoices = useCallback(async () => {
    try {
      const response = await axios.get('/api/customers/1/invoices');

      if (isMountedRef.current) {
        setInvoices(response.data.invoices);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getInvoices();
  }, [getInvoices]);


  const sortedRuns = applySort(runs, sort);
  const [orderBy, order] = sort.split('|');
  const paginatedRuns = applyPagination(sortedRuns, page, limit);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Runs"
      />
      <Divider/>
      <Box
        p={2}
        minHeight={56}
        display="flex"
        alignItems="center"
      >
        <TextField
          className={classes.queryField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <FilterListIcon/>
                </SvgIcon>
              </InputAdornment>
            )
          }}
          onChange={handleQueryChange}
          placeholder="Filter runs i.e status:completed"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1}/>
        <TextField
          label="Sort By"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sort}
          variant="outlined"
        >
          {sortOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </TextField>
      </Box>
      <Divider/>
      <PerfectScrollbar>
        <Box minWidth={1150}>
          <Table>
            <TableHead>
              <TableRow>
                {runFields.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(e) => handleRequestSort(e, headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRuns.map((run) => {

                return (
                  <TableRow
                    key={run.id}
                  >
                    {runFields.map((cell, i) => (
                      <TableCell key={i}>
                        {cell.jsx ? cell.jsx(run) :
                          cell.timestamp ?
                            <Typography variant="body2" color="textSecondary">
                              {run[cell.id] ? moment(run[cell.id]).format('DD MMM YYYY | hh:mm') : 'N/A'}
                            </Typography>
                            : run[cell.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={runs.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Runs.propTypes = {
  className: PropTypes.string,
  runs: PropTypes.array.isRequired
};

export default Runs;
