import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Header from './Header';
import Details from './Details';
import Runs from './Runs';
import Reports from './Reports';
import { useParams } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import api from '../../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerDetailsView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [job, setJob] = useState(null);
  const [report, setReport] = useState(null);
  const [currentTab, setCurrentTab] = useState('details');
  const { jobId } = useParams();
  const { user } = useAuth();

  const tabs = [
    { value: 'details', label: 'Details' },
    { value: 'runs', label: 'Runs' },
    { value: 'reports', label: 'Reports' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const getReport = useCallback(async () => {
    try {
      await user.firebaseUser.getIdToken().then((idToken) => {
        api.setToken(idToken);
      });
      const response = await api.getReport(jobId);

      if (isMountedRef.current) {
        setReport(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [job, isMountedRef]);

  const getJob = useCallback(async () => {
    try {
      await user.firebaseUser.getIdToken().then((idToken) => {
        api.setToken(idToken);
      });
      const response = await api.getJob(jobId);
      if (isMountedRef.current) {
        setJob(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    if (!report && job && job.status === 'completed')
      getReport();
  }, [job]);

  useEffect(() => {
    getJob();
    setInterval(getJob, 3000);
  }, [getJob]);


  if (!job) {
    return null;
  }

  console.log(job);

  return (
    <Page
      className={classes.root}
      title="Job Details"
    >
      <Container maxWidth={false}>
        <Header job={job}/>
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
        </Box>
        <Divider/>
        <Box mt={3}>
          {currentTab === 'details' && <Details job={job}/>}
          {currentTab === 'runs' && <Runs runs={job.runs}/>}
          {currentTab === 'reports' && <Reports job={job} report={report}/>}
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerDetailsView;
