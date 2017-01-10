"use strict";

var React = require('react');
var Input = require('../common/textinput');
var Dropdown = require('../common/dropdown');
var Router = require('react-router');
var Link = Router.Link;

var CourseForm = React.createClass({
  propTypes: {
    course: React.PropTypes.object.isRequired,
    allAuthors: React.PropTypes.array.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  render: function(){
    return (
      <form className="form">
        <h1>Manage Courses</h1>
        <Input name="title"
          label="Course Title"
          placeholder="Course Title"
          value={ this.props.course.title }
          onChange={ this.props.onChange }
          error={ this.props.errors.title } />
        
        <Input name="watchHref" 
          label="URL"
          placeholder="Course URL"
          value={ this.props.course.watchHref }
          onChange={ this.props.onChange }
          error={ this.props.errors.watchHref } />

        <Input name="category"
          label="Course Category"
          placeholder="Course Category"
          value={ this.props.course.category }
          onChange={ this.props.onChange }
          error={ this.props.errors.title } />
        
        <Dropdown 
          name="author" 
          label="Author"
          value={ this.props.course.author ? this.props.course.author.id : '' }
          defaultOption="Select Author"
          options={ this.props.allAuthors }
          onChange={ this.props.onChange }
           />

        <Input name="length"
          label="Length"
          placeholder="Course Length"
          value={ this.props.course.length }
          onChange={ this.props.onChange }
          error={ this.props.errors.title } />

        <div className="btn-toolbar">
          <input type="submit"
            value="Save"
            className="btn btn-primary"
            onClick={this.props.onSave} />

            <Link to="/courses" 
              className="btn btn-warning">Cancel
            </Link>
        </div>

      
      </form>
    );
  }
});

module.exports = CourseForm;

//<Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />