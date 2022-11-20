import React from 'react';
import styles from './styles.module.css';

const UserButton: React.FC<{ displayName: string, children: React.ReactNode }> = ({
  displayName,
  children,
}) => {
  return (
    <div className={styles.container}>
      <details className={styles.details}>
        <summary>{displayName}</summary>
        {children && <div className="hover:text-gray-400">{children}</div>}
      </details>
    </div>
  );
};

export default UserButton;
