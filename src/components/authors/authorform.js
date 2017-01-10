"use strict";

var React = require('react');
var Input = require('../common/textinput');
var Router = require('react-router');
var Link = Router.Link;

var AuthorForm = React.createClass({
  propTypes: {
    author: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  render: function(){
    return (
      <form>
        <h1>Manage Author</h1>
        <Input name="firstName"
          label="First Name"
          placeholder="First Name"
          value={this.props.author.firstName}
          onChange={this.props.onChange}
          error={this.props.errors.firstName} />
        
        <Input name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={this.props.author.lastName}
          onChange={this.props.onChange}
          error={this.props.errors.lastName} />

        <div className="btn-toolbar">
          <input type="submit"
            value="Save"
            className="btn btn-primary"
            onClick={this.props.onSave} />

            <Link to="/authors" 
              className="btn btn-warning">Cancel
            </Link>
        </div>
      </form>
    );
  }
});

module.exports = AuthorForm;

// THIS WAS THE ORIGINAL TEXT AT THE <Input> TAGS.
// <label htmlFor="firstName">First Name</label>
// <input type="text" 
//   name="firstName"
//   className="form-control"
//   placeholder="First Name"
//   ref="firstName"
//   value={this.props.author.firstName}
//   onChange={this.props.onChange}/>
// <br />

// <label htmlFor="lastName">Last Name</label>
// <input type="text" 
//   name="lastName"
//   className="form-control"
//   placeholder="Last Name"
//   ref="lastName"
//   value={this.props.author.lastName}
//   onChange={this.props.onChange}/>
// <br />