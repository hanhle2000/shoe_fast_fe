import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

import { BrowserRouter as Router } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
function App() {
  return (
    <div className="container-fluid">
      <Router>
        <AppLayout></AppLayout>
      </Router>
    </div>
  );
}

export default App;
