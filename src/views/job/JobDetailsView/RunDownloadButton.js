import React, {
  useRef,
  memo,
  useCallback
} from 'react';
import {
  Tooltip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import useAuth from 'src/hooks/useAuth';
import api from 'src/api';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

const RunDownloadButton = ({ run, ...rest }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const moreRef = useRef(null);
  const { user } = useAuth();

  const handleDownloadClick = () => {
    onDownload();
  };

  const onDownload = useCallback(async () => {
    try {
      await user.firebaseUser.getIdToken().then((idToken) => {
        api.setToken(idToken);
      });
      await api.downloadJobResult(run.jobId, run.name);
    } catch (err) {
      console.error(err);
    }
  }, [isMountedRef]);

  return (
    <Tooltip title="Download Run Results">
      <IconButton
        disabled={run.status !== 'completed'}
        onClick={handleDownloadClick}
        ref={moreRef}
        {...rest}
      >
        <GetAppIcon fontSize="small"/>
      </IconButton>
    </Tooltip>
  );
};

export default memo(RunDownloadButton);
