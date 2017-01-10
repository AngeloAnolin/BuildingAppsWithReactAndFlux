"use strict";

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
  isSelected: function(a){
    if(a === this.props.selectedRoute){
      return 'active';
    }
  },
  
  render: function(){
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="images/pluralsight-logo.png" />
          </Link>
          <ul className="nav navbar-nav">
            <li className={this.isSelected('')}><Link to="/">Home</Link></li>
            <li className={this.isSelected('authors')}><Link to="/authors">Authors</Link></li>
            <li className={this.isSelected('courses')}><Link to="/courses">Courses</Link></li>
            <li className={this.isSelected('fixeddatatable')}><Link to="/fixeddatatable">DataTable</Link></li>
            <li className={this.isSelected('about')}><Link to="/about">About</Link></li>
          </ul>
        </div>
      </nav>
    );
  }  
});

module.exports = Header;