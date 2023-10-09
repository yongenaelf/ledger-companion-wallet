const useStyles = {
  loaderContainer: {
    display: 'flex' as const,
    position: 'fixed' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0)',
    flexDirection: 'column' as const
  },
  spinner: {
    width: '11.2px',
    height: '11.2px',
    borderRadius: '11.2px',
    boxShadow: '28px 0px 0 0 rgba(50,99,189,0.2), 22.7px 16.5px 0 0 rgba(50,99,189,0.4), 8.68px 26.6px 0 0 rgba(50,99,189,0.6), -8.68px 26.6px 0 0 rgba(50,99,189,0.8), -22.7px 16.5px 0 0 #3263bd',
    animation: 'spinner-loader 1s infinite linear'
 },
 loadingInfo: {
    paddingTop: '60px',
 }
}
export default useStyles;