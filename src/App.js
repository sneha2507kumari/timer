import './App.css';

function App() {
  return (
    <div className="App">
      <h2>Countdown timer</h2>
      <form>
        <input type="datetime-local" />
        <button>Start time</button>
      </form>
      <div>
         <div>Days</div>
        <div>Hours</div>
        <div>Minute</div>
        <div>Second</div>
      </div>  
    </div>
  );
}

export default App;
