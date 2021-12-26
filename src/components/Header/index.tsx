import React from 'react';
import { useUser } from '../../hooks/useUser';
import UserButton from '../UserButton';

export type HeaderProps = {
  onSignIn: () => void;
  onSignOut: () => void;
  displayName?: string;
};

const Header: React.VFC<HeaderProps> = ({
  onSignIn,
  onSignOut,
  displayName,
}) => {
  return (
    <h1 className="font-bold mb-4 p-4 flex justify-between shadow-lg">
      <div>🃏Planning poker</div>
      <div>
        {!displayName ? (
          <button onClick={onSignIn}>Sing in</button>
        ) : (
          <UserButton displayName={displayName}>
            <button onClick={onSignOut}>Sing out 🖐️</button>
          </UserButton>
        )}
      </div>
    </h1>
  );
};

export default Header;
