const React = require('react');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const Tree = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    nested: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      heading: 'Default Heading'
    };
  },
  
  getInitialState () {
    return {
      orientation: 'rotate(-90deg)',
      displayChildren: false
    }
  },
  
  _handleParentClick () {
    const orientation = this.state.orientation === 'rotate(-90deg)' ? 'rotate(0deg)' : 'rotate(-90deg)';
    
    this.setState({
      orientation,
      displayChildren: !this.state.displayChildren
    })
  },

  _renderChildren () {
    const styles = this.styles();

    if(this.state.displayChildren) {
      return (
        <div style={styles.children}>
          <ul>
            {this.props.nested.map((node, index) => {
              return(
                <li key={index} style={styles.listElement}>{node}</li>
              )
            })}
          </ul>  
        </div>
      )
    } else return null
  },

  render () {
    const styles = this.styles();

      return (
        <div className='mx-tree' style={styles.component}>
          <div onClick={this._handleParentClick} style={styles.parent}>
            <div style={styles.triangle}>▾</div>  <p style={styles.heading}>{this.props.heading}</p>
          </div>
          {this._renderChildren()}
        </div>
      );
  },
  
  styles () {
    return {
      component: {
        margin: '20px'
      },
      heading: {
        margin: 0,
        display: 'inline-block'
      },
      triangle: {
        transform: this.state.orientation,
        display: 'inline-block'
      },
      parent: {
        border: '1px solid gray',
        borderRadius: '5px',
        padding: '5px',
        cursor: 'pointer'
      }
    }
  }
  
});


module.exports = Tree;
