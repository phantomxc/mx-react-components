const React = require('react');

const Icon = require('./Icon');
const Styles = require('../constants/Style');

const Tree = React.createClass({
  propTypes: {
    handleChildClick: React.PropTypes.func.isRequired,
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

  _handleParentClick (id, children) {
    this.setState({
      [id]: !this.state[id]
    });

    if (!children) {
      this.props.handleChildClick();
    }
  },

  _renderTree (level, id = 0) {
    const levelId = id + 1;
    const styles = this.styles();
    let childId = 0;

    return level.map((obj, i) => {
      childId++;

      const objectNameId = levelId + '-' + childId + '-' + obj.name.replace(/\s+/g, '-').toLowerCase();

      return (
        <ul key={i} style={styles.list}>
          <li key={obj.id}>
            <div onClick={this._handleParentClick.bind(null, objectNameId, obj.children)} style={styles.parent}>
              {obj.children && obj.children.length ? (
                <div style={styles.triangle}>
                  <Icon size={20} type={this.state[objectNameId] ? 'caret-down' : 'caret-right'} />
                </div>
              ) : null}
              <Icon
                size={25}
                style={styles.icon}
                type={obj.icon || (obj.children && obj.children.length ? 'list-view' : 'document')}
              />
              <span style={styles.name}>
                {obj.name}
              </span>
            </div>
            {this.state[objectNameId] && obj.children && obj.children.length ? this._renderTree(obj.children, levelId) : null}
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
