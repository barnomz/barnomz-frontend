import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const BLink = ({
                 to,
                 target = '_self',
                 block = false,
                 disabled = false,
                 loading = false,
                 preIcon,
                 icon,
                 iconClass,
                 iconSize = 20,
                 postIcon,
                 color = 'primary',
                 children,
                 onClick
               }) => {

  const classes = [
    'flex justify-center items-center gap-x-2',
    'text-sm font-medium outline-none duration-150 underline-offset-8',
    disabled
      ? 'text-grey-200 cursor-default pointer-events-none'
      : getColorClasses(color),
    {
      'w-full': block,
      'hover:underline': color !== 'transparent',
    },
  ].join(' ');

  const renderIcon = (iconName, size, additionalClass) => {
    if (loading) {
      return <FontAwesomeIcon icon={faSpinner} spin size={size} className={additionalClass}/>;
    }
    if (iconName) {
      return <FontAwesomeIcon icon={iconName} size={size} className={additionalClass}/>;
    }
    return null;
  };

  return (
    <Link href={to} target={target} passHref className={classes} onClick={onClick}>
      {(preIcon && !loading) ? renderIcon(preIcon, iconSize, iconClass) : ''}

      {icon || loading
        ? renderIcon(loading ? faSpinner : icon, iconSize, iconClass)
        : children
      }

      {(postIcon && !loading) ? renderIcon(postIcon, iconSize, iconClass) : ''}
    </Link>
  );
};

const getColorClasses = (color) => {
  switch (color) {
    case 'primary':
      return 'text-primary-700';
    case 'secondary':
      return 'text-secondary-500';
    case 'grey':
      return 'text-grey-600';
    case 'transparent':
      return '';
    default:
      return '';
  }
};

export default BLink;
