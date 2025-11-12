import React from "react"
import ReactDOM from "react-dom/client"

function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem" }}>
      <h1>Kristen Admin Dashboard</h1>
      <p>Admin panel running successfully 🎉</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById("medusa")!).render(<App />)
