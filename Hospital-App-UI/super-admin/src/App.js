import logo from "./logo.svg";
import "./App.css";
import ButtonComponent from "./components/ButtonComponent.jsx";

function App() {
  let loginTexts = ["Login", "Register"];
  return (
    <div className="App">
      <header className="App-header">
      <div style={{ margin: '20px'}}>
        {loginTexts.map((item, index) => (
          <ButtonComponent key={index} buttonText={item} />
        ))}
        </div>
      </header>
    </div>
  );
}

export default App;
