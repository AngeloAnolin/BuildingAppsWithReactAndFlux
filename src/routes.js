"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var browserHistory = ReactRouter.browserHistory;
var IndexRoute = ReactRouter.IndexRoute;
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;

// App Components
var App = require('./components/app');
var HomePage = require('./components/homepage');

// Author Components
var Authors = require('./components/authors/authorpage');
var ManageAuthorPage = require('./components/authors/manageauthorpage');

// Course Components
var Courses = require('./components/courses/coursepage')
var ManageCoursePage = require('./components/courses/managecoursepage');

// DataTable Component
var FixedDataTable = require('./components/fixeddatatable');

var AboutPage = require('./components/about/aboutpage');
var NotFoundPage = require('./components/notfoundpage');

var enterAboutPage = function(location, replaceWith){
  if (!confirm('Are you sure you want to read a page that\'s this boring?')) {
    transition.abort();
  }
}

var routes = (
  <Router history={browserHistory} >
    <Route path="/" component={ App }>
      <IndexRoute component={ HomePage } />
      <Route path="authors" component={ Authors } />
      <Route path="author" component={ ManageAuthorPage } />
      <Route path="author/:id" component={ ManageAuthorPage } />

      <Route path="courses" component={ Courses } />
      <Route path="course" component={ ManageCoursePage } />
      <Route path="course/:id" component={ ManageCoursePage } />

      <Route path="fixeddatatable" component={ FixedDataTable } />

      <Route path="about" component={ AboutPage } onEnter={ enterAboutPage } />
      <Route path="*" component={NotFoundPage} />
    </Route>  
  </Router>
);

module.exports = routes;

/*
<Route name="app" path="/" handler={require('./components/app')} >
    <DefaultRoute handler={require('./components/homepage')} />
    // Authors
    <Route name="authors" handler={require('./components/authors/authorpage')} />
    <Route name="addauthor" path="author" handler={require('./components/authors/manageauthorpage')} />
    <Route name="manageauthor" path="author/:id" handler={require('./components/authors/manageauthorpage')} />

    // Courses
    <Route name="courses" handler={require('./components/courses/coursepage')} />
    <Route name="addcourse" path="course" handler={require('./components/courses/managecoursepage')} />
    <Route name="managecourse" path="course/:id" handler={require('./components/courses/managecoursepage')} />
    // Others
    <Route name="about" handler={require('./components/about/aboutpage')} />
    <NotFoundRoute handler={require('./components/notfoundpage')} />
    <Redirect from="about-us" to="about" />
  </Route>
 */