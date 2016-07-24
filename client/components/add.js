import React, { Component } from 'react';
import { hashHistory } from 'react-router';

class Add extends Component {
  componentWillMount() {
    if (!Meteor.userId()) {
      hashHistory.push('/');
    }
  }

  onFormSubmit(e) {
    e.preventDefault();

    let { title, url, desc } = this.refs;

    title = title.value.trim();
    url = url.value.trim();
    desc = desc.value.trim();

    if (!title) {
      alert("please fill in a title");
      return;
    }

    if (!url) {
      alert("please fill in a url");
      return;
    }

    const data = { title, url, desc };

    Meteor.call('pins.insert', data, (error, pins) => {
      if (error) { alert(error.reason); return; }
      hashHistory.push('/my-pins');
    });
  }

  render() {
    return (
      <div className="add">
        <h3> Add a new pin </h3><hr/>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <div className="form-group">
            <label> Title </label>
            <input type="text" className="input-lg form-control" ref="title"/>
          </div>
          <div className="form-group">
            <label> Pin URL </label>
            <input type="text" className="input-lg form-control" ref="url"/>
          </div>
          <div className="form-group">
            <label> Description <small className="text-muted">*optional</small></label>
            <textarea className="input-lg form-control" ref="desc"/>
          </div>
          <button type="submit" className="btn btn-primary btn-lg"> Submit </button>
        </form>
      </div>
    );
  }
}

export default Add;
