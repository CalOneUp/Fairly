import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '' }) => {
  const baseStyles = 'font-semibold transition rounded-lg';

  const variantStyles = {
    primary: 'bg-violet-500 text-white hover:bg-violet-600 shadow-lg shadow-violet-500/20',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300',
    ghost: 'text-slate-600 hover:bg-slate-100',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Button;