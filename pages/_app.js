import "../styles/globals.css";
import '@mantine/core/styles.css';

import { ThemeProvider } from "next-themes";
import { createTheme, MantineProvider } from '@mantine/core';


const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <MantineProvider theme={createTheme}>
        <Component {...pageProps} />
      </MantineProvider>
    </ThemeProvider>
  );
};

export default App;
