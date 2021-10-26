import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/Header.js";
import AptosList from "./components/AptosList.js";
import Footer from "./components/Footer.js";
import About from "./components/About";


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path = "/aptosList">
          <AptosList />
        </Route>

        <Route exact path = "/about">
          <About />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
