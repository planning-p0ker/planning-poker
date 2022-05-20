import React from 'react';

const ParticipantList: React.VFC<{
  names?: string[];
  className?: React.HTMLAttributes<HTMLUListElement>['className'];
}> = ({ names = ['a'], className = '' }) => {
  return (
    <ul
      className={`p-2 text-sm w-full rounded bg-gray-200 shadow-inner flex flex-wrap flex-col whitespace-nowrap truncate ${className}`}
    >
      {names.map((name, idx) => {
        return (
          <li key={idx} className="px-2">
            {name}
          </li>
        );
      })}
    </ul>
  );
};

export default ParticipantList;
