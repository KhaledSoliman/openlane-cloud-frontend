import React, {
  useState,
  useCallback,
  useEffect
} from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'src/utils/axios';
import Page from 'src/components/Page';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import CustomerEditForm from './CustomerEditForm';
import Header from './Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

const CustomerEditView = () => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const [job, setCustomer] = useState(null);

  const getCustomer = useCallback(async () => {
    try {
      const response = await axios.get('/api/customers/1');
    
      if (isMountedRef.current) {
        setCustomer(response.data.job);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  useEffect(() => {
    getCustomer();
  }, [getCustomer]);

  if (!job) {
    return null;
  }

  return (
    <Page
      className={classes.root}
      title="Customer Edit"
    >
      <Container maxWidth={false}>
        <Header />
      </Container>
      <Box mt={3}>
        <Container maxWidth="lg">
          <CustomerEditForm job={job} />
        </Container>
      </Box>
    </Page>
  );
};

export default CustomerEditView;
