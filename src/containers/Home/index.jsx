import React from "react";
import Head from "../../components/Head";
import "./index.sass";

function App() {
  return (
    <div className="App">
      <Head title="Stolen Bikes" description="" uri="/" image="" />

      <header className="App-header">
        <img src="/logo192.png" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
