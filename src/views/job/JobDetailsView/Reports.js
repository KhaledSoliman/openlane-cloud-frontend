import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  makeStyles, Breadcrumbs, Grid, Hidden, Button, Dialog
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { reportSections } from 'src/constants/jobConstants';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import ReportsPDF from './ReportsPDF';

const useStyles = makeStyles((theme) => ({
  root: {},
  action: {
    marginBottom: theme.spacing(1),
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  }
}));

const Reports = ({ className, job, report, ...rest }) => {
  const classes = useStyles();
  const [viewPDF, setViewPDF] = useState(false);
  const isMountedRef = useIsMountedRef();

  return (
    <>
      <Grid
        container
        justify="space-between"
        spacing={3}
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Grid item>
          <Box p={3}>
            <Typography
              variant="h3"
              color="textPrimary"
            >
              Job reports
            </Typography>
          </Box>
        </Grid>
        {(report) && <Grid item>
          <Hidden smDown>
            <Button
              className={classes.action}
              onClick={() => setViewPDF(true)}
            >
              Preview PDF
            </Button>
          </Hidden>
          <PDFDownloadLink
            document={<ReportsPDF job={job} report={report}/>}
            fileName={`${job.id}-${job.designName}-report`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              color="secondary"
              variant="contained"
              className={classes.action}
            >
              Download PDF
            </Button>
          </PDFDownloadLink>
          <Dialog fullScreen open={viewPDF}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
            >
              <Box
                bgcolor="common.black"
                p={2}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setViewPDF(false)}
                >
                  <NavigateBeforeIcon/>
                  Back
                </Button>
              </Box>
              <Box flexGrow={1}>
                <PDFViewer
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                >
                  <ReportsPDF job={job} report={report}/>
                </PDFViewer>
              </Box>
            </Box>
          </Dialog>
        </Grid>}
      </Grid>
      <Divider/>
      {(report) ?
        report.map((run, i) => {
          return (
            <div key={i}>
              <Box p={5}>
                <Typography
                  variant="h3"
                  color="textPrimary"
                >
                  {job.designName + ' | ' + run.config}
                </Typography>
              </Box>
              <Divider/>
              {reportSections.map((section, sectionIndex) => (
                <Box m={3} key={sectionIndex} minWidth={1150}>
                  <Card>
                    <CardHeader title={section.sectionName}/>
                    <Divider/>
                    <PerfectScrollbar>
                      <Table>
                        <TableBody>
                          {section.fields.map((field, fieldIndex) => {
                              return (
                                <TableRow key={fieldIndex}>
                                  <TableCell>{field.label}</TableCell>
                                  <TableCell
                                    align="left">{run[field.id]}{field.unit && ` ${field.unitLabel}`}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </PerfectScrollbar>
                  </Card>
                </Box>
              ))}
            </div>
          );
        })
        :
        <Box display="flex" justifyContent="center" m={1} p={1}>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="body2"
          >
            No reports available
          </Typography>
        </Box>
      }
    </>
  );
};

Reports.propTypes = {
  className: PropTypes.string,
  report: PropTypes.array.isRequired,
  job: PropTypes.object.isRequired
};

export default Reports;
