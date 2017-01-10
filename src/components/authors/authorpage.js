"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorActions = require('../../actions/authoractions');
var AuthorStore = require('../../stores/authorstore');
var AuthorList = require('./authorlist');

var AuthorPage = React.createClass({
  getInitialState: function(){
    return {
      authors: AuthorStore.getAllAuthors()
    };
  },

  componentWillMount: function(){
    AuthorStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function(){
    AuthorStore.removeChangeListener(this.onChange);
  },

  onChange: function(){
    this.setState({authors: AuthorStore.getAllAuthors() });
  },

  render: function(){
    return (
      <div>
        <h1>Authors</h1>
        <Link to="author" className="btn btn-default">Add Author</Link>
        <AuthorList authors={this.state.authors} />
      </div>
    );
  }
});

module.exports = AuthorPage;