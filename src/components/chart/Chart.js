import React, { Component } from "react";
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;
import { connect } from "react-redux";
import { getBills } from "../../actions/billActions";


class Chart extends Component {

    componentDidMount = () => {
        this.props.getBills();
    }
  
    render(){

        let { bills } = this.props;

        //building data for chart
        let data = bills.map(bill => {
            let s = bill.date;
            let p = parseInt(s[3]);
            let q = parseInt(s[4]);
            let r = p*10 + q;
            return {x: r, y: parseInt(bill.amount)};
        }) 


		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2",
			title:{
                text: "Time-series chart of the monthly billing cycle",
                fontSize: 20,
			},
			axisY: {
                title: "Amount Spent",
                fontSize: 10,
				suffix: " Rs"
			},
			axisX: {
                title: "Day",
                fontSize: 10,
                suffix: " Jan",
				interval: 2
			},
			data: [{
				type: "line",
				toolTipContent: "{x} Jan: {y} Rs",
				dataPoints: data
			}]
        }
        
		return (
		<div style={{marginTop:"25px"}} className="container">
			<CanvasJSChart options = {options}/>
		</div>
        );
    }
}


const mapStateToProps = state => ({
    bills: state.bill.bills
});
  
export default connect(mapStateToProps, { getBills })(Chart);