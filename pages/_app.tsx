import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

console.log(
  'process.env.REDIRECT_SIGN_IN_URL',
  process.env.REDIRECT_SIGN_IN_URL
);
console.log(
  'process.env.REDIRECT_SIGN_OUT_URL',
  process.env.REDIRECT_SIGN_OUT_URL
);

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: process.env.REDIRECT_SIGN_IN_URL,
    redirectSignOut: process.env.REDIRECT_SIGN_OUT_URL,
  },
  ssr: true,
};
Amplify.configure(updatedAwsConfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
