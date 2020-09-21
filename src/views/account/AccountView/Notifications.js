import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // NOTE: Make API request
    await wait(500);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Notifications" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                gutterBottom
                variant="h6"
                color="textPrimary"
              >
                System
              </Typography>
              <Typography
                gutterBottom
                variant="body2"
                color="textSecondary"
              >
                You will receive emails on your contact email address
              </Typography>
              <div>
                <FormControlLabel
                  control={(
                    <Checkbox defaultChecked />
                  )}
                  label="Email alerts"
                />
              </div>
              <div>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Push Notifications"
                />
              </div>
            </Grid>
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
            >

            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          p={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            color="secondary"
            type="submit"
            variant="contained"
          >
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
