import React, { Component } from 'react';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = { surveyTitle: '' };
  }

  render() {
    return (
        <div className="col-md-5">
          <div className="inner-addon right-addon">
            <span><i className="glyphicon glyphicon-search"></i></span>
            <input className="form-control"
              value = { this.state.surveyTitle } placeholder="Search"
              onChange={ event => this.onInputChange(event.target.value) } />
          </div>
        </div>
    );
  }

  onInputChange(surveyTitle) {
    this.setState({ surveyTitle });
    this.props.onSearchTermChange(surveyTitle);
  }
}

export default SearchBar;