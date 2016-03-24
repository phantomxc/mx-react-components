const React = require('react');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');


const Tree = React.createClass({
  propTypes: {
    childIconType: React.PropTypes.string,
    items: React.PropTypes.array,
    iconColor: React.PropTypes.string,
    parentIconType: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      childIconType: 'document',
      iconColor: StyleConstants.Colors.PRIMARY,
      parentIconType: 'list-view'
    };
  },

  getInitialState () {
    return {
      triangleOrientation: 'rotate(-90deg)',
      displayChildren: false
    };
  },

  _handleParentClick (index) {
    console.log("this is index", index);
    const triangleOrientation = this.state.triangleOrientation === 'rotate(-90deg)' ? 'rotate(0deg)' : 'rotate(-90deg)';

    this.setState({
      triangleOrientation,
      displayChildren: !this.state.displayChildren
    });
  },

  renderTree () {
    return <ul> {this.props.items.map((obj, index) => this.recursiveJson(obj, index))} </ul>
  },
  
  recursiveJson (obj, index) {
    const styles = this.styles();

    console.log("this is children", obj.children);
    const renderChild = (json) => this.recursiveJson(json)
    return (
      <ul>
        <div onClick={this._handleParentClick.bind(null, index)} style={styles.parent}>
          {obj.children ? (
          <span>  
          <div style={styles.triangle}>▾</div>
          <Icon
            size={20}
            style={{ color: this.props.iconColor }}
            type={this.props.parentIconType}
          />
          </span>
        ) : (
          <Icon
            size={20}
            style={{ color: this.props.iconColor }}
            type={this.props.childIconType}
          />
        )}
        <span style={styles.heading}>{obj.name}</span>
        </div>
        <div style={styles.children}>
          {obj.children ? obj.children.map(renderChild) : null}
        </div>
      </ul>
    )
  },

  render () {
    const styles = this.styles();

    return (
      <div className='tree'>
        {this.renderTree()}
      </div>
    );
  },

  styles () {
    return {
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
        paddingLeft: 20
      },
      triangle: {
        transform: this.state.triangleOrientation,
        display: 'inline-block',
        position: 'absolute',
        left: '-20px',
        top: 10
      },
      parent: {
        cursor: 'pointer',
        position: 'relative'
      }
    };
  }

});

module.exports = Tree;
