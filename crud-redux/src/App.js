
import './App.css';
import store from './Components/Redux/Store';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import Crud from './Components/Crud';

function App() {
  return (
       <Provider store={store}>
        <div className="App">
          <Crud/>
        </div>
      </Provider>
  );
}

export default App;
