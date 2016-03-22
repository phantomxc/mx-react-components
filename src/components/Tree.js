const React = require('react');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const Tree = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    nested: React.PropTypes.array,
    iconType: React.PropTypes.string,
    iconColor: React.PropTypes.string
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
          <ul style={styles.list}>
            {this.props.nested.map((node, index) => {
              return(
                <li key={index} style={styles.listElement}><span style={styles.heading}>{node}</span></li>
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
            <div style={styles.triangle}>▾</div><Icon type={this.props.iconType} size={20} style={{color: '#359BCF'}}/><p style={styles.heading}>{this.props.heading}</p>
          </div>
          {this._renderChildren()}
        </div>
      );
  },
  
  styles () {
    return {
      component: {
        
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
        padding: 5
      },
      triangle: {
        transform: this.state.orientation,
        display: 'inline-block',
        marginRight: 5
      },
      parent: {
        cursor: 'pointer'
      }
    }
  }
  
});


module.exports = Tree;
