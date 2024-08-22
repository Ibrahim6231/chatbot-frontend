import './App.css';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast';
import store from './app/store';

function App() {

  return (
    <div className="App">
      <BrowserRouter> {/* commonly renamed as Router*/}
        <Provider store={store}>  {/* commonly renamed as ReduxProvider*/}
          <AppRoutes />
          <Toaster />
        </Provider>
      </BrowserRouter>
    </div>
  );
}

export default App; //this export is req. in index.tsx file where it will be added in root element
