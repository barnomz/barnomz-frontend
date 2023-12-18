import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import BLink from './BLink'

const BBtn = ({
  to,
  target = '_self',
  block = false,
  disabled = false,
  loading = false,
  preIcon,
  icon,
  iconClass,
  iconSize = 'md',
  postIcon,
  color = 'secondary',
  onClick,
  children,
  ...props
}) => {
  const classes = [
    'flex justify-center items-center gap-x-2 ripple',
    'text-sm font-medium outline-none transition-all duration-200',
    color.includes('-text')
      ? 'hover:underline underline-offset-8'
      : 'py-2 sm:py-3 px-4 rounded',
    disabled
      ? 'bg-grey-50 text-grey-200 cursor-default pointer-events-none'
      : getColorClasses(color),
    block ? 'w-full' : '',
  ].join(' ')

  props.className = props.className ? props.className + ' ' + classes : classes

  const renderIcon = (iconName) => {
    if (!iconName) return null
    return (
      <FontAwesomeIcon
        icon={iconName}
        spin={loading}
        size={iconSize}
        className={iconClass}
      />
    )
  }

  if (to) {
    return (
      <BLink
        to={to}
        target={target}
        block={block}
        disabled={disabled}
        loading={loading}
        preIcon={preIcon}
        icon={icon}
        iconClass={iconClass}
        iconSize={iconSize}
        postIcon={postIcon}
        color='transparent'
        onClick={onClick}
        {...props}
      >
        {children}
      </BLink>
    )
  }

  return (
    <button disabled={disabled} onClick={onClick} {...props}>
      {preIcon && !loading && renderIcon(preIcon)}
      {icon || loading ? renderIcon(loading ? faSpinner : icon) : children}
      {postIcon && !loading && renderIcon(postIcon)}
    </button>
  )
}

const getColorClasses = (color) => {
  switch (color) {
    case 'primary-text':
      return 'text-primary-dark hover:border-primary-dark'
    case 'primary':
      return 'bg-primary text-grey-50 hover:bg-primary-light'
    case 'primary-light':
      return 'bg-primary-light text-grey-50 hover:bg-primary-lighter'
    case 'secondary-text':
      return 'text-secondary-dark hover:border-secondary-dark'
    case 'secondary':
      return 'bg-secondary-dark text-white hover:bg-secondary'
    case 'success':
      return 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800'
    case 'error':
      return 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800'
    case 'grey-text':
      return 'text-grey-50 hover:border-grey-100'
    case 'grey':
      return 'bg-grey-50 text-grey-800 hover:bg-grey-200 active:bg-grey-300'
    default:
      return ''
  }
}

export default BBtn
