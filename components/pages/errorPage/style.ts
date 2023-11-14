import connectBgImage from '../../../assets/icon/connect-bg.svg';

const styles = {
  layoutContainer: {
    minHeight: '100vh',
    width: '100%'
  },
  contentContainer: {
    background: '#fff',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    width: '425px',
    whiteSpace: 'nowrap' as const,
    margin: 0,
  },
  rightContainer: {
    flex: 1,
    backgroundImage: `url(${connectBgImage.src})`,
    zIndex: 1,
  },
  stickyHeader: {
    display: 'flex' as const,
    justifyContent: 'center',
  }
}
export default styles;