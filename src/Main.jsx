import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"
import ErrorBoundary from "./Utilities/ErrorBoundary"
import { AuthProvider } from "./Contexts/Auth.Context"
import "./Styles/Index.css"
import "./Styles/Style.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
