import { Divider, Link } from '@mui/material';
import { PropsWithChildren } from 'react';
import { User } from '../../hooks/useUser';
import Header from '../Header';
import GitHubIcon from '@mui/icons-material/GitHub';

type LayoutProps = {
  user: User | null;
  onSignIn: () => void;
  onSignOut: () => void;
};

export const Layout: React.VFC<PropsWithChildren<LayoutProps>> = ({
  user,
  children,
  onSignIn,
  onSignOut,
}) => {
  return (
    <>
      <Header
        displayName={user?.displayName}
        onSignIn={onSignIn}
        onSignOut={onSignOut}
      />
      <Divider />
      <main className="max-w-3xl mx-auto pt-10">{children}</main>
      <Link
        className="flex space-x-1 justify-center mt-40"
        href="https://github.com/planning-p0ker/planning-poker"
        target="_blank"
      >
        <GitHubIcon style={{ color: 'black' }} />
        <div>https://github.com/planning-p0ker/planning-poker</div>
      </Link>
    </>
  );
};
