import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const BLink = ({
                 to,
                 target = '_self',
                 block = false,
                 disabled = false,
                 loading = false,
                 preIcon,
                 icon,
                 iconClass,
                 iconSize = 'sm',
                 postIcon,
                 color = 'secondary',
                 onClick,
                 children,
                 ...props
               }) => {

  const classes = [
    'flex justify-center items-center gap-x-2',
    'text-sm font-medium outline-none duration-150 underline-offset-8',
    disabled
      ? 'text-grey-200 cursor-default pointer-events-none'
      : getColorClasses(color),
    block && 'w-full',
    color !== 'transparent' && 'hover:underline'
  ].join(' ')

  props.className = props.className + ' ' + classes

  const renderIcon = (iconName, size, additionalClass) => {
    if (loading) {
      return <FontAwesomeIcon icon={faSpinner} spin size={size} className={additionalClass} />
    }
    if (iconName) {
      return <FontAwesomeIcon icon={iconName} size={size} className={additionalClass} />
    }
    return null
  }

  return (
    <Link href={to} target={target} passHref onClick={onClick} {...props}>
      {(preIcon && !loading) && renderIcon(preIcon, iconSize, iconClass)}

      {icon || loading
        ? renderIcon(loading ? faSpinner : icon, iconSize, iconClass)
        : children
      }

      {(postIcon && !loading) && renderIcon(postIcon, iconSize, iconClass)}
    </Link>
  )
}

const getColorClasses = (color) => {
  switch (color) {
    case 'primary':
      return 'text-primary'
    case 'secondary':
      return 'text-secondary-dark'
    case 'grey':
      return 'text-grey-600'
    case 'transparent':
      return ''
    default:
      return ''
  }
}

export default BLink
