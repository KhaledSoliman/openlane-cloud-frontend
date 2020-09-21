import React, {
  useRef,
  useState,
  memo
} from 'react';
import {
  Tooltip,
  IconButton,
  Menu,
  makeStyles, Typography
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StopIcon from '@material-ui/icons/Stop';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(() => ({
  menu: {}
}));

const JobMoreButton = ({job, ...rest}) => {
  const classes = useStyles();
  const moreRef = useRef(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(true);
  };

  const handleMenuClose = () => {
    setOpenMenu(false);
  };
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
          to={`/${job.jobId}`}
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
            //props.onStop(job);
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
          disabled={job.status !== 'completed'}
          onClick={() => {
            //props.downloadJobResult(job.jobId);
          }}>
          <ListItemIcon>
            <GetAppIcon
              fontSize="small"/>
          </ListItemIcon>
          <Typography
            variant="caption"
            noWrap>
            Download
          </Typography>
        </MenuItem>
        <Divider/>
        <MenuItem
          disabled={job.status !== 'completed' && job.status !== 'stopped'}
          onClick={() => {
            //props.onDelete(job.jobId);
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
