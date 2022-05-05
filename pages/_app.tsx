import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports';

const isLocalhost = process.env.NODE_ENV === 'development';

// Assuming you have two redirect URIs, and the first is for localhost and second is for production
const [localRedirectSignIn, productionRedirectSignIn] =
  awsconfig.oauth.redirectSignIn.split(',');

const [localRedirectSignOut, productionRedirectSignOut] =
  awsconfig.oauth.redirectSignOut.split(',');

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};
Amplify.configure(updatedAwsConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
