import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from './components/Header';
import Footer from './components/Footer';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});

const queryClient = new QueryClient();

Amplify.configure(awsExports);

const App = () => {
  return (
    <Authenticator.Provider>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
    
      </QueryClientProvider>
    </ThemeProvider>
    </Authenticator.Provider>
  );
};

export default App;
