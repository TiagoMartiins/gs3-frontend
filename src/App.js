import React, { useState } from "react";
import Routes from "./routes/routes";
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './styles/global';
import { theme } from './theme';
import  Burger  from "./components/burger";
import  Menu  from "./components/menu";




function App () {
  const [open, setOpen] = useState(false);
  return (
    <ThemeProvider theme={theme}>
      <>
        <Routes />
        <GlobalStyles />
        <div>
          <Burger open={open} setOpen={setOpen} />
          <Menu open={open} setOpen={setOpen} />
        </div>
      </>
    </ThemeProvider>
  );
}
export default App;