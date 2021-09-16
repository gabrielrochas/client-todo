import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navigation/NavBar";
import { ToDoList, ToDoAdd, ToDoEdit }  from "../pages/ToDo";


export default function App() {
  

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={ToDoList} />
        <Route path="/todos/new" component={ToDoAdd} />
        <Route path="/todos/update/:id" exact component={ToDoEdit} />
        <Route path="/todos/delete/:id" exact component={ToDoList} />
      </Switch>
    </Router>
  );
}
