import Link from 'next/link';
import React from 'react';
import UserButton from './components/UserButton';

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
    <>
      <header className="font-bold p-4 flex justify-between">
        <p
          style={{
            letterSpacing: 0,
            fontWeight: 500,
            fontSize: 24,
          }}
        >
          <Link href="/">🃏Planning poker</Link>
        </p>
        <div>
          {!displayName ? (
            <button onClick={onSignIn}>SING IN</button>
          ) : (
            <UserButton displayName={displayName}>
              <button onClick={onSignOut}>Sing out 🖐️</button>
            </UserButton>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
