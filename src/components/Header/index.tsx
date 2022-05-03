import Link from 'next/link';
import React from 'react';
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
      <Link href="/">🃏Planning poker</Link>
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
