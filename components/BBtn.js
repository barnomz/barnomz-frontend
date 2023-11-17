import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSpinner} from '@fortawesome/free-solid-svg-icons';
import BLink from './BLink';

const BBtn = ({
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
                onClick,
                children,
              }) => {
  const classes = [
    'flex justify-center items-center gap-x-2',
    'text-sm font-medium outline-none duration-150',
    color.includes('-text')
      ? 'hover:underline underline-offset-8'
      : 'py-2 sm:py-3 px-4 rounded',
    disabled
      ? 'bg-grey-50 text-grey-200 cursor-default pointer-events-none'
      : getColorClasses(color),
    {
      'w-full': block,
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
        color="transparent"
        className={classes}
        onClick={onClick}
      >
        {children}
      </BLink>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={onClick}
    >
      {(preIcon && !loading) && renderIcon(preIcon, iconSize, iconClass)}

      {(icon || loading)
        ? renderIcon(loading ? faSpinner : icon, iconSize, iconClass)
        : children
      }

      {(postIcon && !loading) && renderIcon(postIcon, iconSize, iconClass)}
    </button>
  );
};

const getColorClasses = (color) => {
  switch (color) {
    case 'primary-text':
      return 'text-primary-700 hover:border-primary-700';
    case 'primary':
      return 'bg-primary text-grey-800 hover:bg-primary-600 active:bg-primary-700';
    case 'secondary-text':
      return 'text-secondary-500 hover:border-secondary-500';
    case 'secondary':
      return 'bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700';
    case 'success':
      return 'bg-success-600 text-white hover:bg-success-700 active:bg-success-800';
    case 'error':
      return 'bg-error-600 text-white hover:bg-error-700 active:bg-error-800';
    case 'grey-text':
      return 'text-grey-400 hover:border-grey-400';
    case 'grey':
      return 'bg-grey-50 text-grey-800 hover:bg-grey-200 active:bg-grey-300';
    default:
      return '';
  }
};

export default BBtn;
