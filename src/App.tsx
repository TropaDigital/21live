import { BrowserRouter } from 'react-router-dom';
import AppProvider from './hooks';
import Routes from './routes';

import { GlobalStyles } from './styles/global';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>
          <Routes />
        </AppProvider>
      </BrowserRouter>
      <GlobalStyles />
    </>
  );
}

export default App;