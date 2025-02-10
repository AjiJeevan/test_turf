import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import "./index.css"

createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
        <App />
    </Provider>
  </>
);
