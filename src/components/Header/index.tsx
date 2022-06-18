import Link from 'next/link';
import React from 'react';
import { Button, Divider } from 'ui-neumorphism';
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
            <Button onClick={onSignIn}>SING IN</Button>
          ) : (
            <UserButton displayName={displayName}>
              <button onClick={onSignOut}>Sing out 🖐️</button>
            </UserButton>
          )}
        </div>
      </header>
      <div className="px-4">
        <Divider />
      </div>
    </>
  );
};

export default Header;
