import { PropsWithChildren } from 'react';
import { User } from '../../hooks/useUser';
import Header from '../Header';

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
      <main className="max-w-3xl mx-auto">{children}</main>
    </>
  );
};
