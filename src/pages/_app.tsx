import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
