const useStyles = {
  btnContainer: {
    background: '#ECF7FF',
    height: '56px',
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    margin: '-1px -25px -25px -25px',
    borderRadius: '0 0 6px 6px',
  },
  btn: {
    color: '#3EABFD',
    fontSize: 16,
    fontWeight: 400
  },
  floatLink: {
    position: 'absolute' as const,
    right: 8,
    top: 8
  },
  paperlayoutContainer: {
    marginBottom: 24
  },
  blockTag: {
    display: 'block',
    textAlign: 'center' as const,
    background: '#F5F6F7',
    border: '1px solid #E0E0E0'
  },
  inputfield: {
    height: '40px',
    width: '100%'
  },
  modalTitle: {
    padding: 0,
    margin: 0,
    fontSize: 20,
    fontWeight: 500
  },
  errorBlock: {
    display: 'block' as const,
    marginTop: '24px'
  },
  modalInfo: {
    color: '#BFBFBF',
    fontSize: '12px',
    fontWeight: 400,
    marginTop: '-8px',
    display: 'block',
  }
}
export default useStyles;