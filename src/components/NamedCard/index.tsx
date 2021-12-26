import React from 'react';
import CardUI, { CardUIProps } from '../Card';

const NamedCard: React.VFC<CardUIProps & { userDisplayName: string }> = ({
  point,
  hidden,
  onClick,
  disabled,
  userDisplayName = '',
}) => {
  return (
    <div className="relative w-28 h-40">
      <CardUI
        className="absolute"
        disabled={disabled}
        hidden={hidden}
        point={point}
        onClick={onClick}
      />
      <p
        className={`absolute text-center text-sm top-5 left-4 w-20 truncate ${
          hidden ? 'text-white' : 'text-black'
        }`}
      >
        {userDisplayName}
      </p>
    </div>
  );
};

export default NamedCard;
