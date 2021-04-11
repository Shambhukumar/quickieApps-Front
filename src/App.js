import Home from "./components/home/home"
import Header  from "./components/header/header"
import HeroCard from "./components/heroCards/heroCards"
import View from "./components/view/view";
import { BrowserRouter as Router,  Route, Redirect, Switch } from "react-router-dom";
function App() {
  return (
<Router>
    
    
    <div className="App">
    <Header/>
    <HeroCard/>
    <Switch>
    <Route exact path="/home" component={Home}/>
    <Route exact path="/view" component={View}/>
    <Redirect from='/' to="/home"/>
    </Switch>
    </div>
    </Router>


    
  );
}
export default App;
