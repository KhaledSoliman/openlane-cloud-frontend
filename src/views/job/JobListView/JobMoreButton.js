import React, {
  useRef,
  useState,
  memo, useCallback, useEffect
} from 'react';
import {
  Tooltip,
  IconButton,
  Menu,
  makeStyles, Typography
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StopIcon from '@material-ui/icons/Stop';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import useAuth from 'src/hooks/useAuth';
import api from 'src/api';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(() => ({
  menu: {}
}));

const JobMoreButton = ({ job, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };

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
    <>
      <Tooltip title="More options">
        <IconButton
          onClick={handleMenuOpen}
          ref={moreRef}
          {...rest}
        >
          <MoreIcon fontSize="small"/>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={moreRef.current}
        onClose={handleMenuClose}
        open={openMenu}
        PaperProps={{ className: classes.menu }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
      >
        <MenuItem
          component={RouterLink}
          to={`${location.pathname}/${job.jobId}/details`}
          onClick={() => {
          }}>
          <ListItemIcon>
            <ArrowForwardIosIcon fontSize="small"/>
          </ListItemIcon>
          <Typography
            variant="caption"
            noWrap>
            View Details
          </Typography>
        </MenuItem>
        <Divider/>
        <MenuItem
          disabled={job.status === 'completed' || job.status === 'stopped' || job.status === 'stopping' || job.status === 'failed'}
          onClick={() => {
            onStop();
            handleMenuClose();
          }}>
          <ListItemIcon>
            <StopIcon
              fontSize="small"/>
          </ListItemIcon>
          <Typography
            variant="caption"
            noWrap>
            Stop
          </Typography>
        </MenuItem>
        <Divider/>
        <MenuItem
          disabled={job.status !== 'completed' && job.status !== 'stopped'}
          onClick={() => {
            onDelete();
            handleMenuClose();
          }}>
          <ListItemIcon>
            <DeleteIcon
              fontSize="small"/>
          </ListItemIcon>
          <Typography
            variant="caption"
            noWrap>
            Delete
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default memo(JobMoreButton);
