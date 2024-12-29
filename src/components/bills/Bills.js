import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Preloader } from 'react-materialize';
import { getBills, getCategoryBills } from "../../actions/billActions";
import Dropdown from "../layouts/Dropdown";
import Bill from "./Bill";
import "./Style.css";


class Bills extends Component {

  state = {
    render: false,
    category: "All Categories",
  }


  componentDidMount() {
    //fetching all bills data
    this.props.getBills();
    
    setTimeout(() => { 
      this.setState({render:true})
    }, 500);
  }

  
  //function to fetch all bills of selected category
  onSelect = (event) => {

    this.props.getCategoryBills(event.target.value);

    this.setState({
      category:event.target.value,
      render:false
    });
    setTimeout(() => { 
      this.setState({render:true})
    }, 1000);
  }


  render() {
    
    //the amount of budget for month is taken as 40000
    let budget = 40000;
    let { bills, category_bills } = this.props;


    //sorting 'all bills' data in descending order of amount
    bills.sort((a, b) => parseInt(b.amount) - parseInt(a.amount));


    //updating each bill with a 'should be paid' property (finding minimum number of bills that should be paid)
    let updated_bills = bills.map(bill => {
      if(bill.amount <= budget){
        budget -= bill.amount;
        return {...bill, should_be_paid: true};
      }
      else{
        return {...bill, should_be_paid: false};
      }
    })

    
    //sorting 'all bills' data in ascending order of id's
    updated_bills.sort((a, b) => parseInt(a.id) - parseInt(b.id));


    //deciding which bills will be rendered, based on category
    let bills_to_render = (this.state.category == "All Categories") ? updated_bills : category_bills;


    //preloader will be rendered until 'this.state.render' is false
    if(this.state.render == false){
        return (
          <div className="preloader">
          <Row>
          <Col s={5}></Col>
          <Col s={2}><Preloader active color="blue" flashing /></Col>
          <Col s={5}></Col>
          </Row>
          </div>
        )
    }
  
    return (

      //rendering bills
      <div className="container">
        <Dropdown onSelect={this.onSelect} bills={bills} category={this.state.category}/>
          <Row>
          {bills_to_render && bills_to_render.map(bill => (
            <Col className="col-sm-12 col-md-12 col-lg-6">
            <Bill key = {bill.id} bill = {bill} />
            </Col>
          ))}
          </Row>
      </div>
    );   
  }
}

const mapStateToProps = state => ({
  bills: state.bill.bills,
  category_bills: state.bill.category_bills
});

export default connect(mapStateToProps, { getBills, getCategoryBills })(Bills);