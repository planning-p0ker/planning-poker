import React, { PropsWithChildren, useMemo } from 'react';
import { Button as BaseButton } from 'ui-neumorphism';

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  primary?: boolean;
  width?: number;
};

const Button: React.VFC<PropsWithChildren<ButtonProps>> = ({
  children,
  onClick,
  disabled = false,
  width = 32,
}) => {
  return (
    <BaseButton disabled={disabled} onClick={onClick}>
      {children}
    </BaseButton>
  );
};

export default Button;
