import React, { PropsWithChildren, useMemo } from 'react';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
};

const Button: React.VFC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  disabled = false,
  primary = false,
}) => {
  const theme = useMemo(() => {
    return primary
      ? 'bg-blue-500 text-white'
      : 'border-2 border-blue-500 text-blue-500';
  }, [primary]);

  return (
    <button
      className={`shadow-md w-32 py-1 px-5 rounded disabled:opacity-50 font-bold disabled:pointer-events-none ${theme}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;