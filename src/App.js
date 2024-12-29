import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import Bills from './components/bills/Bills';
import AddBill from './components/bills/AddBill';
import EditBill from './components/bills/EditBill';
import Navbar from "./components/layouts/Navbar";
import Chart from "./components/chart/Chart";
import store from "./store";
import './App.css';


class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <BrowserRouter>            
            <div className="text-font"> 
            <Navbar/>    
            <Switch>
            <Route path="/" exact component={Bills} />
            <Route path="/chart" exact component={Chart} />
            <Route path="/add" exact component={AddBill} />
            <Route path="/bill/edit/:id" exact component={EditBill} />
            </Switch>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
