import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HashRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
    },
  },
});


ReactDOM.render(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
      </ThemeProvider>, document.getElementById('root')
);
