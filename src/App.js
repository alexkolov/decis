import logo from './logo.svg';
import * as Api from './api/block'
import './App.css';

function createBlock() {
  console.log('create Block')
  Api.createBlock()
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={createBlock}>Create</button>
        
      </header>
    </div>
  );
}

export default App;
