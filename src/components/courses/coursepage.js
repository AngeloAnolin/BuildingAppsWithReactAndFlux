"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var CourseActions = require('../../actions/authoractions');
var CourseStore = require('../../stores/coursestore');
var CourseList = require('./courselist');

var CoursePage = React.createClass({
  getInitialState: function(){
    return {
      courses: CourseStore.getAllCourses()
    };
  },

  componentWillMount: function(){
    CourseStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function(){
    CourseStore.removeChangeListener(this.onChange);
  },

  onChange: function(){
    this.setState({ courses: CourseStore.getAllCourses() });
  },

  render: function(){
    return (
      <div>
        <h1>Courses</h1>
        <Link to="course" className="btn btn-primary">Add Course</Link>

        <CourseList courses={this.state.courses} />
      </div>
    );
  }
});

module.exports = CoursePage;