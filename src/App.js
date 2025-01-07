import './App.css';
import RouteModule from './RouteModule';
import { Provider } from 'react-redux';
import bookStore from './Utils/store/bookStore'
function App() {
  return (
    <div className="App">
      <Provider store={bookStore}>
          <RouteModule/>
      </Provider>
    </div>
  );
}

export default App;
