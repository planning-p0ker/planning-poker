import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import UserButton from './components/UserButton';
import GoogleIcon from '@mui/icons-material/Google';

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
            <Button
              variant="outlined"
              onClick={onSignIn}
              startIcon={<GoogleIcon />}
            >
              SING IN WITH GOOGLE
            </Button>
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
