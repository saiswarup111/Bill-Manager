import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button, Card, Row, Col } from 'react-materialize';
import { addBill, getBills } from "../../actions/billActions";


class AddBill extends Component {

  state = {
    amount: "",
    category: "",
    description:"",
    date: ""
  };

  componentDidMount() {
    //fetching all bills data
    this.props.getBills();
  }

  
  //functions to handle input changes in form
  handleAmount = (event) => {
      this.setState({ amount: event.target.value })
  }
  handleCategory = (event) => {
      this.setState({ category: event.target.value })
  }
  handleDescription = (event) => {
      this.setState({ description: event.target.value })
  }
  handleDate = (event) => {
      this.setState({ date: event.target.value })
  }


  //adding newBill to the list of bills
  onSubmit = (event) => {

    event.preventDefault();
    const { amount, category, date, description } = this.state;
    
    const newBill = {
      id: this.props.bills.length + 1,
      description: description,
      category: category,
      amount: amount,
      date: date,
    };

    this.props.addBill(newBill);
 
    this.setState({
        amount: "",
        category: "",
        date: "",
        description: "",
    });

    this.props.history.push("/");
  };


  render() {

    const { amount, category, date, description } = this.state;

    return (

        <Row>
        <Col m={3}></Col> 

        <Col m={6} l={4} s={12}>
        <Card className="margin-top">
          <h5 className="heading">Add a Bill</h5><hr></hr> 
          <span><TextInput value={amount} type="number" placeholder="Enter Amount" 
           onChange={this.handleAmount} label="amount"/></span>

          <span><TextInput value={category} type="text" placeholder="Enter Category" 
           onChange={this.handleCategory} label="category"/></span>

          <span><TextInput value={description} type="text" placeholder="Enter Description" 
           onChange={this.handleDescription} label="description"/></span>

          <span><TextInput value={date} type="date" placeholder="Enter Date" 
           onChange={this.handleDate} label="date"/></span>

          <Button waves="light" onClick={this.onSubmit}>Add</Button>
        </Card>
        </Col>

        <Col m={3}></Col> 
        </Row>
    );
  }
}


const mapStateToProps = state => ({
    bills: state.bill.bills
  });


export default connect(mapStateToProps, { addBill, getBills })(AddBill);
