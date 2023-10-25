import connectBgImage from '../../../assets/icon/connect-bg.svg';

const useStyles = {
  rightContainer: {
    flex: 1,
    backgroundImage: `url(${connectBgImage.src})`,
    zIndex: 1,
  },
  layoutContainer: {
    minHeight: '100vh',
    width: '100%'
  },
  contentContainer: {
    background: '#fff',
    display: 'inline-flex',
    justifyContent: 'flex-end',
  },
  stickyHeader: {
    position: 'fixed' as const,
    left: 0,
    right: 0,
  }
}
export default useStyles;