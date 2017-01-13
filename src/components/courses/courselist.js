"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Toastr = require('toastr');
var CourseActions = require('../../actions/courseactions');
var Confirm = require('react-confirm-bootstrap');

var ReactBsTable = require("react-bootstrap-table");
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;

var CourseList = React.createClass({
  propTypes: {
    courses: React.PropTypes.array.isRequired
  },

  onConfirm: function(title, id, event){
    CourseActions.deleteCourse(id);
    Toastr.success("Course Deleted");
  },

  deleteCourse: function(title, id, event){
    event.preventDefault();
  },

  confirmDeleteFormatter: function(cell, row){
    return(
        <Confirm
          onConfirm={ this.onConfirm.bind(this, row.title, row.id) }
          body="Confirm Delete of this Course"
          confirmText="Delete"
          title={ row.title }
          >
          <a ref="#" className="btn btn-danger">Delete</a>
        </Confirm>
      );
  },

  authorNameFormatter: function(cell, row){
    return(
      <p>{ cell.name }</p>
    );
  },

  urlFormatter: function(cell, row){
    return(
      <a href={ cell } target="_blank">Link</a>
    );
  },

  linkFormatter: function(cell, row){
    return(
      <Link to={"course/" + cell}>{ cell }</Link>
    );
  },

  render: function(){
    return (
      <div className="row">
        <BootstrapTable data={this.props.courses} striped hover>
          <TableHeaderColumn dataFormat={ this.confirmDeleteFormatter } width="100"></TableHeaderColumn>
          <TableHeaderColumn isKey={ true } dataField='id' dataFormat={ this.linkFormatter } dataSort={ true }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='title' dataSort={ true }>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='author' dataFormat={ this.authorNameFormatter } dataSort={ true }>Author</TableHeaderColumn>
          <TableHeaderColumn dataField='watchHref' dataFormat={ this.urlFormatter } dataSort={ true }>URL</TableHeaderColumn>
          <TableHeaderColumn dataField='length' dataSort={ true }>Length</TableHeaderColumn>
          <TableHeaderColumn dataField='category' dataSort={ true }>Category</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
});

module.exports = CourseList;