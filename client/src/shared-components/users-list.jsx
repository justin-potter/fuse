import React, { Component, PropTypes } from 'react';
import { List } from 'material-ui/List';
import UsersListEntry from './users-list-entry';

// onSelect
// componentWillMount

class UsersList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
    };
  }

  componentWillMount() {
    this.props.componentWillMount();
  }

  onSelect(user, index) {
    this.props.onSelect(user, index);
  }

  renderUserList() {
    const onSelect = this.onSelect.bind(this);

    return this.state.users.map((user, index) =>
      (
        <UsersListEntry
          key={user.id}
          firstName={user.firstName}
          lastName={user.lastName}
          profilePictureURL={user.profilePictureURL}
          selected={user.selected}
          onSelect={() => onSelect(user, index)}
        />
      ),
    );
  }

  render() {
    return (
      <List>
        {this.renderUserList()}
      </List>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  componentWillMount: PropTypes.func,
  onSelect: PropTypes.func,
};

UsersList.defaultProps = {
  ComponentWillMount: () => {},
  onSelect: () => {},
};

export default UsersList;
