"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var browserHistory = ReactRouter.browserHistory;
var CourseForm = require('./courseform');
var CourseActions = require('../../actions/courseactions');
var CourseStore = require('../../stores/coursestore');
var AuthorStore = require('../../stores/authorstore');
var Toastr = require('toastr');
var ValidUrl = require('valid-url');

var _formatAuthorObject = function(author){
  return {
    id: author.id,
    name: author.firstName + ' ' + author.lastName
  };
};

var getCourseState = function(id){
  return CourseStore.getCourseById(id);
};

var ManageCoursePage = React.createClass({
  componentDidMount: function(){
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  },

   routerWillLeave: function(nextLocation){
    if (this.state.dirty) {
			return 'Leave without saving course?';
		}
		return true;
  },

  getInitialState: function(){
    return {
      course: {
        id: null,
        title: null,
        watchHref: null,
        author: null,
        length: null,
        category: null
      },

      errors: {},

      dirty: false
    };
  },

  componentWillMount: function(){
    CourseStore.addChangeListener(this.onChange);
    this.setState({ allAuthors: AuthorStore.getAllAuthors().map(_formatAuthorObject) });

    var courseId = this.props.params.id;    // From the path #/course:id
    if(courseId){
      this.setState({ course: CourseStore.getCourseById(courseId) });
    }
  },

  componentWillUnmount: function(){
    CourseStore.removeChangeListener(this.onChange);
  },

  onChange: function(){
    this.setState(getCourseState(this.state.course.id));
  },

  setCourseState: function(event){
    this.setState({ dirty: true });
    var field = event.target.name;
    var value = event.target.value;
    
    if(field === 'author'){
      var author = AuthorStore.getAuthorById(value);
      value = _formatAuthorObject(author);
    }

    this.state.course[field] = value;
    return this.setState({ course: this.state.course });
  },

  courseFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {};   // Clear previous errors

    if(this.state.course.title == null || this.state.course.title.length < 3){
      this.state.errors.title = "Course Title must be at least 3 characters.";
      formIsValid = false;
    }

    if(this.state.course.watchHref == null || this.state.course.watchHref.length < 6){
      this.state.errors.watchHref = "Course URL must be at least 6 characters.";
      formIsValid = false;
    }
    else{
      if(!ValidUrl.isUri(this.state.course.watchHref)){
          this.state.errors.watchHref = "Invalid URL.";
          formIsValid = false;
        }
    }

    if(this.state.course.category == null || this.state.course.category.length < 3){
      this.state.errors.category = "Category must be at least three characters.";
      formIsValid = false;
    }

    if(this.state.course.author == null){
      this.state.errors.author = "Author is required for the course.";
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveCourse: function(event){
    event.preventDefault();

    if(!this.courseFormIsValid()){
      return;
    }

    if(this.state.course.id){
      CourseActions.updateCourse(this.state.course);
    }
    else{
      CourseActions.createCourse(this.state.course);
    }

    this.setState({ dirty: false }, function(){
      Toastr.success("Course Saved!");
      browserHistory.push('/courses');
    });
  },

  render: function(){
    return (
      <div>
        <CourseForm 
          course={ this.state.course }
          allAuthors={ this.state.allAuthors }
          onChange={ this.setCourseState }
          onSave={ this.saveCourse}
          errors={this.state.errors} />
      </div>
    );
  }
});

module.exports = ManageCoursePage;