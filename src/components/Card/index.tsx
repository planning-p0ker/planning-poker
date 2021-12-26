import React from 'react';

export type CardUIProps = {
  point: number;
  selected?: boolean;
  hidden?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

const CardUI: React.VFC<CardUIProps> = ({
  point,
  selected,
  hidden,
  onClick,
  disabled = false,
  className = '',
}) => {
  if (hidden) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
     bg-gray-100 flex items-center justify-center w-28 h-40 p-auto text-center border rounded border-black shadow-lg p-2
      disabled:opacity-50 disabled:pointer-events-none
      ${
        selected
          ? 'border-blue-500 opacity-30 hover:opacity-50'
          : 'hover:opacity-60'
      } ${className}`}
      >
        <div className="bg-blue-400  flex items-center justify-center w-full h-full rounded text-white">
          <p className={`mx-2 w-full align-middle text-lg`}>?</p>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
       bg-gray-100 flex items-center justify-center w-28 h-40 p-auto text-center border rounded border-black shadow-lg
       disabled:opacity-50 disabled:pointer-events-none
        ${
          selected ? 'opacity-30 hover:opacity-50' : 'hover:opacity-60'
        } ${className}`}
    >
      <p className={`mx-2 w-full align-middle text-lg`}>{point}</p>
    </button>
  );
};

export default CardUI;
