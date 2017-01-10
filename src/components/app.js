/* eslint-disable strict */  // Disabling check because we are running global variables. 

//$ = jQuery = require('jquery');
var React = require('react');
var Header = require('./common/header');

var App = React.createClass({
  render: function(){
    var idx = window.location.href.lastIndexOf('/');
    var selectedRoute = '';
    if(idx >= 0){
      selectedRoute = window.location.href.substring(idx + 1);
    }

    return (
      <div>
        <Header selectedRoute={selectedRoute} />
        <div className="container-fluid">
          { this.props.children }
        </div>
      </div>
    );
  }
});

module.exports = App;