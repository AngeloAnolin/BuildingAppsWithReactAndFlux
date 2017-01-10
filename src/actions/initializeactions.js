"use strict";

var Dispatcher = require('../dispatcher/appdispatcher');
var AuthorApi = require('../api/authorapi');
var CourseApi = require('../api/courseapi');
var ActionTypes = require('../constants/actiontypes');

var InitializeActions = {
  initApp: function(){
    Dispatcher.dispatch({
      actionType: ActionTypes.INITIALIZE,
      initialData: {
        authors: AuthorApi.getAllAuthors(),
        courses: CourseApi.getAllCourses()
      }
    });
  }
};

module.exports = InitializeActions;