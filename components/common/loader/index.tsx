import useStyles from "./style";

interface LoaderProps {
  message?: string;
}

const Loader = ({
  message
}: LoaderProps) => {
  const classes = useStyles;

  return (
    <div style={classes.loaderContainer}>
      <div style={classes.spinner}></div>
      <div style={classes.loadingInfo}>{message || 'Loading...'}</div>
    </div>
  );
}

export default Loader;