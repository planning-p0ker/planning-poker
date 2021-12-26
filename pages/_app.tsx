import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import awsconfig from '../src/aws-exports';

// let isLocalhost = false;
// if (typeof window !== 'undefined') {
//   isLocalhost = Boolean(
//     window.location.hostname === 'localhost' ||
//       // [::1] is the IPv6 localhost address.
//       window.location.hostname === '[::1]' ||
//       // 127.0.0.1/8 is considered localhost for IPv4.
//       window.location.hostname.match(
//         /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
//       )
//   );
// }

// // Assuming you have two redirect URIs, and the first is for localhost and second is for production
// const [localRedirectSignIn, productionRedirectSignIn] =
//   awsconfig.oauth.redirectSignIn.split(',');

// const [localRedirectSignOut, productionRedirectSignOut] =
//   awsconfig.oauth.redirectSignOut.split(',');

// console.log(isLocalhost);

// const updatedAwsConfig = {
//   ...awsconfig,
//   oauth: {
//     ...awsconfig.oauth,
//     redirectSignIn: isLocalhost
//       ? localRedirectSignIn
//       : productionRedirectSignIn,
//     redirectSignOut: isLocalhost
//       ? localRedirectSignOut
//       : productionRedirectSignOut,
//   },
// };
Amplify.configure(awsconfig);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
