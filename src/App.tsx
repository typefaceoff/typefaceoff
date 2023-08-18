import { useState } from "react";
import "./App.css";
import FontUploader from "./components/FontUploader";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Welcome to TypeFaceOff!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
      </div>
      <div>
        <FontUploader />
      </div>
    </>
  );
}

export default App;
