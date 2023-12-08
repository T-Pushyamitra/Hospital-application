import "./App.css";
import RegisterComponent from "./components/Authentication/RegisterComponent";

function App() {
  let loginTexts = ["Login", "Register"];
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ margin: "20px" }}>
          <RegisterComponent />
        </div>
      </header>
    </div>
  );
}

export default App;
