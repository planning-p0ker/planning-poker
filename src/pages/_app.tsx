import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Head from 'next/head';

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#080AEF',
    },
    secondary: {
      main: '#8A07BD',
    },
    background: {
      default: '#0C0C0A',
      paper: '#F3F3F0',
    },
    text: {
      primary: '#0C0C0A',
    },
    divider: '#0C0C0A',
  },
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>planning-poker</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🃏</text></svg>"
        />
        <link
          rel="icon alternate"
          type="image/png"
          href="https://twemoji.maxcdn.com/v/14.0.2/72x72/1f0cf.png"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
