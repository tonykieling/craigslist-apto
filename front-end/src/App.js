import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Header from "./components/Header.js";
import AptosList from "./components/AptosList.js";
// import Home from "./components/Home.js";
import Footer from "./components/Footer.js";


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path = "/">
          {/* <Home /> */}
        </Route>
        <Route exact path = "/about">
          {/* <AddProduct /> */}
        </Route>

        <Route exact path = "/aptosList">
          <AptosList />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
