import React, { Component } from "react";
import { connect } from "react-redux";
import { TextInput, Button, Card, Row, Col } from 'react-materialize';
import { updateBill, getBill } from "../../actions/billActions";


class EditBill extends Component {

  state = {
    amount: "",
    category: "",
    description:"",
    date: ""
  };

  //fetching bill data with id given
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getBill(id);
  }


  componentWillReceiveProps(nextProps, nextState) {
    //updating state with fetched bill data, so that old values can be shown in input fields of the form
    const { amount, category, description, date } = nextProps.bill;
    this.setState({ amount, category, description, date });
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


  //updating bill data with given id, in the list of bills
  onSubmit = (event) => {

    event.preventDefault();
    const { amount, category, date, description } = this.state;
    
    const updatedBill = {
      id: this.props.match.params.id,
      description: description,
      category: category,
      amount: amount,
      date: date,
    };

    this.props.updateBill(updatedBill);
 
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
        <Col m={4}></Col> 

        <Col m={6} l={4} s={12}>
        <Card className="margin-top">
          <h5 className="heading">Update Bill</h5><hr></hr>     
          <span><TextInput value={amount} type="number" placeholder="Enter Amount" 
           onChange={this.handleAmount} label="amount"/></span>

          <span><TextInput value={category} type="text" placeholder="Enter Category" 
           onChange={this.handleCategory} label="category"/></span>

          <span><TextInput value={description} type="text" placeholder="Enter Description" 
           onChange={this.handleDescription} label="description"/></span>

          <span><TextInput value={date} type="date" placeholder="Enter Date" 
           onChange={this.handleDate} label="date"/></span>

          <Button waves="light" onClick={this.onSubmit}>Update</Button>
        </Card>
        </Col>

        <Col m={4}></Col> 
        </Row>
    );
  }
}


const mapStateToProps = state => ({
    bill: state.bill.bill
  });
  

export default connect(mapStateToProps, { getBill, updateBill })(EditBill);
