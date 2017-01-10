"use strict";

// Dropdown is from http://jsfiddle.net/davidwaterston/7a3xxLtw/

var React = require('react');

var DropDown = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        defaultOption: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string,
        options: React.PropTypes.array.isRequired
    },
    
    // getDefaultProps: function() {
    //     return {
    //         value: null,
    //         valueField: 'value',
    //         labelField: 'label',
    //         onChange: null
    //     };
    // },
    
    // getInitialState: function() {
    //     var selected = this.getSelectedFromProps(this.props);
    //     return {
    //         selected: selected
    //     }
    // },
    
    // componentWillReceiveProps: function(nextProps) {
    //     var selected = this.getSelectedFromProps(nextProps);
    //     this.setState({
    //         selected: selected
    //     });
    // },
    
    // getSelectedFromProps: function(props){
    //     var selected;
        
    //     if (props.value === null && props.options.length !== 0) {
    //         selected = props.options[0][props.valueField];
    //     } else {
    //         selected = props.value;
    //     }
    //     return selected;
    // },
    
    render: function() {
        var self = this;
        var wrapperClass = "form-group";
        var renderOption = function(option) {
            return (
                <option 
                    key={ option.id } 
                    value={ option.id }>
                    { option.name }
                </option>
            )
        };
        
        return (
            <div className={ wrapperClass }>
                <label 
                    htmlFor={ this.props.name }>
                    { this.props.label }
                </label>
                <div className="field">
                    <select 
                        name={ this.props.name } 
                        value={ this.props.value }
                        className='form-control' 
                        onChange={ this.props.onChange }>
                        <option value="">{ this.props.defaultOption }</option>
                        { this.props.options.map(renderOption) }
                    </select>
                    <div className="input">{this.props.error}</div>
                </div>
            </div>
        )
    },
    
    handleChange: function(e) {
        if (this.props.onChange) {
            var selectedItem = {
                name: e.target.name,
                value: e.target.value
        }
        this.props.onChange(selectedItem);
    }
    this.setState({selected: e.target.value});
  }
});

module.exports = DropDown;
