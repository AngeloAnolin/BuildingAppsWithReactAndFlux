"use strict";

var React = require('react');
var ReactRouter = require('react-router');
var withRouter = ReactRouter.withRouter;
var browserHistory = ReactRouter.browserHistory;
var AuthorForm = require('./authorform');
var AuthorActions = require('../../actions/authoractions');
var AuthorStore = require('../../stores/authorstore');
var Toastr = require('toastr');

var ManageAuthorPage = React.createClass({
  componentDidMount: function(){
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
  },

  routerWillLeave: function(nextLocation){
    if (this.state.dirty) {
			return 'Leave without saving author?';
		}
		return true;
  },

  getInitialState: function(){
    return {
      author: {
        id: null,
        firstName: null,
        lastName: null
      },

      errors: {},

      dirty: false
    };
  },

  componentWillMount: function(){
    var authorId = this.props.params.id;  // From the path #/author:id
    if(authorId){
      this.setState({author: AuthorStore.getAuthorById(authorId)});
    }
  },

  setAuthorState: function(event){
    this.setState({dirty: true});
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

  authorFormIsValid: function(){
    var formIsValid = true;
    this.state.errors = {};         // Clear any previous errors.

    if(this.state.author.firstName == null || this.state.author.firstName.length < 3){
      this.state.errors.firstName = 'First Name must be at least 3 characters';
      formIsValid = false;
    }

    if(this.state.author.lastName == null || this.state.author.lastName.length < 3){
      this.state.errors.lastName = 'Last Name must be at least 3 characters';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors});
    return formIsValid;
  },

  saveAuthor: function(event){
    event.preventDefault();

    if(!this.authorFormIsValid()){
      return;
    }

    if(this.state.author.id){
      AuthorActions.updateAuthor(this.state.author);
    }
    else{
      AuthorActions.createAuthor(this.state.author);
    }
    
    this.setState({dirty: false}, function(){
      Toastr.success('Author Saved');
      browserHistory.push('/authors');
    });
  },

  render: function(){
    return (
      <div>
        <AuthorForm author={this.state.author} 
          onChange={this.setAuthorState} 
          onSave={this.saveAuthor}
          errors={this.state.errors} />
      </div>
    );
  }
});

module.exports = ManageAuthorPage;

/*
mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component){
      if(component.state.dirty && !confirm('Leave without saving author?')){
        transition.abort();
      }
    }
  },
 */