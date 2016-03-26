const React = require('react');

const Icon = require('./Icon');
const StyleConstants = require('../constants/Style');

const Tree = React.createClass({
  propTypes: {
    iconColor: React.PropTypes.string,
    items: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      iconColor: StyleConstants.Colors.PRIMARY
    };
  },

  getInitialState () {
    return {
      null
    };
  },

  _handleParentClick (id) {
    this.setState({
      [id]: !this.state[id]
    });
  },

  renderTree (level, id = 0) {
    const levelId = id + 1;
    let childId = 0;
    const styles = this.styles();

    return level.map((obj, index) => {
      childId++;
      return (
        <ul key={index} style={styles.list}>
          <li key={obj.id}>
            <div onClick={this._handleParentClick.bind(null, levelId + '-' + childId)} style={styles.parent}>
              {obj.children && obj.children.length ? (
                <div style={styles.triangle}>
                  {this.state[levelId + '-' + childId] ? <Icon size={20} type='caret-down'/> : <Icon size={20} type='caret-right'/>}
                </div>
              ) : null}
              <Icon
                size={25}
                style={{
                  color: this.props.iconColor
                }}
                type={obj.icon || (obj.children && obj.children.length ? 'list-view' : 'document')}
              />
              <span style={styles.name} >
                {obj.name}
              </span>
            </div>
            {this.state[levelId + '-' + childId] && obj.children && obj.children.length ? this.renderTree(obj.children, levelId) : null}
          </li>
        </ul>
      );
    });
  },

  render () {
    return (
      <div className='tree'>
        {this.renderTree(this.props.items)}
      </div>
    );
  },

  styles () {
    return {
      iconHolder: {
        border: '1px solid ' + StyleConstants.Colors.ASH,
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
        display: 'inline-block',
        position: 'absolute',
        left: -20,
        top: 3
      },
      parent: {
        cursor: 'pointer',
        position: 'relative',
        listStyleType: 'none',
        fontFamily: StyleConstants.Fonts.THIN,
        margin: '15px 0'
      }
    };
  }

});

module.exports = Tree;
