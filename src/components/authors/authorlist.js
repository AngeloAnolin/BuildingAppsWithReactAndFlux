"use strict";

var React = require('react');
var Link = require('react-router').Link;
var Toastr = require('toastr');
var AuthorActions = require('../../actions/authoractions');

var AuthorList = React.createClass({
  propTypes: {
    authors: React.PropTypes.array.isRequired
  },

  deleteAuthor: function(id, event){
    event.preventDefault();
    if(confirm('Delete this record?')){
      AuthorActions.deleteAuthor(id);
      Toastr.success('Author Deleted');
    }
  },

  render: function(){
    var createAuthorRow = function(author){
      return (
        <tr key={author.id} >
        <td>
          <a ref="#" onClick={this.deleteAuthor.bind(this, author.id)} className="btn btn-danger">Delete</a>
        </td>
          <td>
            <Link to={ "author/" + author.id }>{author.id}</Link>
          </td>
          <td>
            {author.firstName} {author.lastName}
          </td>
        </tr>
      );
    };

    return (
      <div>
        <table className="table table-hover table-striped">
          <thead>
            <tr>
              <th></th>
              <th>
                ID
              </th>
              <th>
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.authors.map(createAuthorRow, this)}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = AuthorList;