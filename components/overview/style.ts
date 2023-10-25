const useStyles = {
  networkLayout: {
    display: 'flex',
    justifyContent: 'center' as const,
    alignItems: 'flex-end' as const,
    flexDirection: 'column' as const,
    gap: '8px'
  },
  selectField: {
    color: '#266CD3',
    height: '40px'
  },
  SelectFieldWithIcon: {
    width: '45px',
    color: '#fff',
  },
  selectFieldIconWrapper: {
    display: 'inline-block' as const,
    width: '45px',
    position: 'relative' as const
  },
  selectFieldIcon: {
    position: 'absolute' as const,
    top: '21px',
    left: '12px',
    zIndex: 1,
    fontSize: 22,
    cursor: 'pointer',
  },
  title: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 1.5,
  },
  btnNoSpacing: {
    padding: 0
  },
  balanceValue: {
    fontWeight: 500,
    fontSize: 48,
  },
  balanceLabel: {
    fontWeight: 500,
    fontSize: 20,
    marginTop: '18px',
    display: 'inline-block',
  },
  accountLayout: {
    background: '#F8F8F8',
    padding: '16px 24px 14px 24px',
    borderRadius: '4px',
    position: 'relative' as const,
  }
}

export default useStyles;