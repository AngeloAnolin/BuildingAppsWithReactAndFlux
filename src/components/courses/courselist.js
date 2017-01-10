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
    // if(confirm('Delete the course ' + title + '?')){
    //   CourseActions.deleteCourse(id);
    //   Toastr.success("Course Deleted");
    // }
    //<a ref="#" onClick={this.deleteCourse.bind(this, course.title, course.id)} className="btn btn-danger">Delete</a>
  },

  render: function(){
    var urlFormatter = function(cell, row){
      return(
        <a href={ cell } target="_blank">Link</a>
      );
    };

    var linkFormatter = function(cell, row){
      console.log(row);
      return(
        <Link to={"course/" + cell}>{ cell }</Link>
      );
    };

    var createCourseRow = function(course){
      return (
        <tr key={course.id}>
          <td>
            <Confirm
              onConfirm={this.onConfirm.bind(this, course.title, course.id)}
              body="Confirm Delete of this Course"
              confirmText="Delete"
              title={course.title}
              >
              <a ref="#" className="btn btn-danger">Delete</a>
            </Confirm>
            
          </td>
          <td>
            <Link to={"course/" + course.id}>{ course.id }</Link>
          </td>
          <td>
            { course.title }
          </td>
          <td>{ course.author.name }</td>
          <td>
            <a href={ course.watchHref } target="_blank">Link</a>
          </td>
          <td className="text-center">
            { course.length }
          </td>
          <td className="text-center">
            { course.category }
          </td>
        </tr>
      );
    };

    return (
      <div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th></th>
              <th>
                ID
              </th>
              <th>
                Course Title
              </th>
              <th>Author</th>
              <th>URL</th>
              <th>Length</th>
              <th className="text-center">Category</th>
            </tr>
          </thead>
          <tbody>
            {this.props.courses.map(createCourseRow, this)}
          </tbody>
        </table>

        <BootstrapTable data={this.props.courses} striped hover>
          <TableHeaderColumn></TableHeaderColumn>
          <TableHeaderColumn isKey={ true } dataField='id' dataFormat={ linkFormatter }>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='watchHref' dataFormat={ urlFormatter }>URL</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
});

module.exports = CourseList;