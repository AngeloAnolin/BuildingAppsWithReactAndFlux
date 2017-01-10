"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var NotFoundPage = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Page Not Found</h1>
        <p>Sorry, the page you entered was not found in the system.</p>
        <p><Link to="app" >Back To Home</Link></p>
      </div>
    );
  }
});

module.exports = NotFoundPage;