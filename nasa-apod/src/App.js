import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import NasaPhoto from './components/NasaPhoto';


function App() {
  return (
      <BrowserRouter>
        <div className="app">
            <Route path='/' exact component={Home} />
            <Route path='/nasaphoto' component={NasaPhoto} />
            
        </div>
      </BrowserRouter>
  );
}

export default App;
