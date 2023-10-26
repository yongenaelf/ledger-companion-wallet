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
    fontSize: 22,
  },
  selectFieldIconCover: {
    position: 'absolute' as const,
    top: '12px',
    left: 0,
    height: '40px',
    width: '45px',
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '8px',
    background: '#fff',
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