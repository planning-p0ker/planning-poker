import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

console.log(
  'process.env.REDIRECT_SIGN_IN_URL',
  process.env.NEXT_PUBLIC_REDIRECT_SIGN_IN_URL
);
console.log(
  'process.env.REDIRECT_SIGN_OUT_URL',
  process.env.NEXT_PUBLIC_REDIRECT_SIGN_OUT_URL
);

console.log('before : awsconfig.oauth', awsconfig.oauth.redirectSignIn);
console.log('before : awsconfig.oauth', awsconfig.oauth.redirectSignOut);

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

console.log('after : awsconfig.oauth', updatedAwsConfig.oauth.redirectSignIn);
console.log('after : awsconfig.oauth', updatedAwsConfig.oauth.redirectSignOut);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
