import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN_URL,
    redirectSignOut: process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT_URL,
  },
  ssr: true,
};
Amplify.configure(updatedAwsConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
