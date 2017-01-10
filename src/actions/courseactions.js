"use strict";

var Dispatcher = require('../dispatcher/appdispatcher');
var CourseApi = require('../api/courseapi');
var ActionTypes = require('../constants/actiontypes');

var CourseActions = {
  createCourse: function(course){
    var newCourse = CourseApi.saveCourse(course);

    // Inform store that the course was just created.
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_COURSE,
      course: newCourse
    });
  },

  updateCourse: function(course){
    var updatedCourse = CourseApi.saveCourse(course);
    
    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_COURSE,
      course: updatedCourse
    });
  },

  deleteCourse: function(id){
    CourseApi.deleteCourse(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_COURSE,
      id: id
    });
  }
};

module.exports = CourseActions;