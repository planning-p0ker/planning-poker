import React from 'react';

const ParticipantList: React.VFC<{
  names?: string[];
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}> = ({ names = ['test1', 'test2', 'test3', 'test4'], className = '' }) => {
  return (
    <div
      className={`p-4 w-full rounded bg-gray-200 shadow-inner flex flex-wrap flex-col ${className}`}
    >
      {names.map((name, idx) => {
        return <p key={idx}>{name}</p>;
      })}
    </div>
  );
};

export default ParticipantList;
