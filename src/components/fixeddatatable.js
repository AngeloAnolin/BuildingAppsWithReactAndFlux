"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var Link = Router.Link;
var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var products = [{
      id: 1,
      name: "Product1",
      price: 120
  }, {
      id: 2,
      name: "Product2",
      price: 80
  }];

var ThisPage = React.createClass({
  render: function(){
    return (
      <div>
        <BootstrapTable data={products} striped hover>
          <TableHeaderColumn isKey dataField='id'>Product ID</TableHeaderColumn>
          <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
          <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
});

module.exports = ThisPage;

// var React = require('react');
// var ReactDOM = require('react-dom');
// var Link = require('react-router').Link;
// // var FixedDataTable = require('fixed-data-table');
// // var Table = FixedDataTable.Table;
// // var Column = FixedDataTable.Column;
// // var Cell = FixedDataTable.Cell;

// // const rows = [
// //       ['a1', 'b1', 'c1'],
// //       ['a2', 'b2', 'c2'],
// //       ['a3', 'b3', 'c3']
// //     ];

// var FixedDataTable = React.createClass({
//   render: function(){
//     return (
//       <div>
//         <h1>DATATABLE HERE!</h1>
//       </div>
//     );
//   }
// });

// module.expoorts = FixedDataTable;