const React = require('react');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const Tree = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    iconColor: React.PropTypes.string,
    iconType: React.PropTypes.string,
    nested: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      heading: 'Default Heading',
      iconColor: StyleConstants.Colors.ASH
    };
  },

  getInitialState () {
    return {
      orientation: 'rotate(-90deg)',
      displayChildren: false
    };
  },

  _handleParentClick () {
    const orientation = this.state.orientation === 'rotate(-90deg)' ? 'rotate(0deg)' : 'rotate(-90deg)';

    this.setState({
      orientation,
      displayChildren: !this.state.displayChildren
    });
  },

  _renderIcon (node) {
    const styles = this.styles();

    if (typeof node === 'string') {
      return (
        <div>
        <Icon
          size={20}
          style={{ color: '#359BCF' }}
          type='document'/>
        <span style={styles.heading}>{node}</span>
        </div>
      );
    } else {
      return (
        <div>{node}</div>
      );
    }
  },

  _renderChildren () {
    const styles = this.styles();

    if (this.state.displayChildren) {
      return (
        <div style={styles.children}>
          <ul style={styles.list}>
            {this.props.nested.map((node, index) => {
              return (
                <div key={index} style={styles.parent}>
                  {this._renderIcon(node)}
                </div>
              );
            })}
          </ul>
        </div>
      );
    } else return null;
  },

  render () {
    const styles = this.styles();

    return (
      <div className='mx-tree' style={styles.component}>
        <div onClick={this._handleParentClick} style={styles.parent}>
          <div style={styles.triangle}>▾</div>
          <Icon
            size={20}
            style={{ color: '#359BCF' }}
            type={this.props.iconType}
          />
          <span style={styles.heading}>{this.props.heading}</span>
        </div>
        {this._renderChildren()}
      </div>
    );
  },

  styles () {
    return {
      component: {
        margin: 0
      },
      heading: {
        margin: 0,
        display: 'inline-block',
        marginLeft: 5,
        marginTop: 10,
        marginBottom: 10,
        fontFamily: StyleConstants.Fonts.THIN
      },
      iconHolder: {
        border: '1px solid gray',
        padding: 2,
        borderRadius: 5,
        display: 'inline-block'
      },
      list: {
        listStyleType: 'none',
        margin: 0,
        paddingLeft: 15
      },
      triangle: {
        transform: this.state.orientation,
        display: 'inline-block',
        position: 'absolute',
        left: '-20px',
        top: 10
      },
      parent: {
        cursor: 'pointer',
        position: 'relative',
        padding: 0
      }
    };
  }

});


module.exports = Tree;
