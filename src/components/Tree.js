const React = require('react');

const Icon = require('./Icon');
const Styles = require('../constants/Style');

const Tree = React.createClass({
  propTypes: {
    iconColor: React.PropTypes.string,
    items: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      iconColor: Styles.Colors.PRIMARY
    };
  },

  getInitialState () {
    return {};
  },

  _handleParentClick (id) {
    this.setState({
      [id]: !this.state[id]
    });
  },

  _renderTree (level, id = 0) {
    const levelId = id + 1;
    const styles = this.styles();
    let childId = 0;

    return level.map((obj, i) => {
      childId++;

      return (
        <ul key={i} style={styles.list}>
          <li key={obj.id}>
            <div onClick={this._handleParentClick.bind(null, levelId + '-' + childId)} style={styles.parent}>
              {obj.children && obj.children.length ? (
                <div style={styles.triangle}>
                  <Icon size={20} type={this.state[levelId + '-' + childId] ? 'caret-down' : 'caret-right'} />
                </div>
              ) : null}
              <Icon
                size={25}
                style={styles.icon}
                type={obj.icon || (obj.children && obj.children.length ? 'list-view' : 'document')}
              />
              <span style={styles.name} >
                {obj.name}
              </span>
            </div>
            {this.state[levelId + '-' + childId] && obj.children && obj.children.length ? this._renderTree(obj.children, levelId) : null}
          </li>
        </ul>
      );
    });
  },

  render () {
    return (
      <div className='tree'>
        {this._renderTree(this.props.items)}
      </div>
    );
  },

  styles () {
    return {
      icon: {
        color: this.props.iconColor
      },
      iconHolder: {
        border: '1px solid ' + Styles.Colors.ASH,
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
        fontFamily: Styles.Fonts.THIN,
        margin: '15px 0'
      }
    };
  }

});

module.exports = Tree;
