import React, {
  useCallback,
  useEffect,
  useState
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import api from 'src/api';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Page from 'src/components/Page';
import Header from './Header';
import Results from './Results';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const JobListView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [jobs, setJobs] = useState([]);
  const { user } = useAuth();

  const getJobs = useCallback(async () => {
    try {
      await user.firebaseUser.getIdToken().then((idToken) => {
        api.setToken(idToken);
      });
      const response = await api.getJobs();
      if (isMountedRef.current) {
        setJobs(response.data.rows);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getJobs();
    setInterval(getJobs, 3000);
  }, [getJobs]);

  return (
    <Page
      className={classes.root}
      title="Jobs List"
    >
      <Container maxWidth={false}>
        <Header />
        <Box mt={3}>
          <Results jobs={jobs} />
        </Box>
      </Container>
    </Page>
  );
};

export default JobListView;
