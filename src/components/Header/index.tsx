import { Button } from '@mui/material';
import Link from 'next/link';
import UserButton from './components/UserButton';
import GoogleIcon from '@mui/icons-material/Google';

export type HeaderProps = {
  onSignIn: () => void;
  onSignOut: () => void;
  displayName?: string;
};

const Header: React.FC<HeaderProps> = ({
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
              SIGN IN WITH GOOGLE
            </Button>
          ) : (
            <UserButton displayName={displayName}>
              <button type='button' onClick={onSignOut}>Sign out 🖐️</button>
            </UserButton>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
