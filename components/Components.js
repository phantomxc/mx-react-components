const React = require('react');
const { Link, RouteHandler } = require('react-router');

const Components = React.createClass({
  render () {
    return (
      <div className='container flex'>
        <div className='sideNav'>
          <h3>General</h3>
          <Link to='icon'>Icon</Link>
          <Link to='loader'>Loader</Link>
          <Link to='spin'>Spin</Link>

          <h3>Form</h3>
          <Link to='range-selector'>Range Selector</Link>
          <Link to='select'>Select</Link>
        </div>
        <div className='content'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});

module.exports = Components;