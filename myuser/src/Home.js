import React from 'react';
import ViewTab from './UserGrid';
import EditTab from './EditTab';
import UserGrid from './UserGrid';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'view',
      selectedUser: null,
    };
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab });
  };

  handleEditUser = (user) => {
    this.setState({ activeTab: 'edit', selectedUser: user });
  };

  handleAddUser = () => {
    this.setState({ activeTab: 'edit', selectedUser: null });
  };

  render() {
    const { activeTab, selectedUser } = this.state;
    return (
      <div>
        <button onClick={() => this.handleTabChange('view')}>View</button>
        <button onClick={() => this.handleTabChange('edit')}>Edit</button>
        {activeTab === 'view' && (
          <UserGrid
            onEditUser={this.handleEditUser}
            onAddUser={this.handleAddUser}
          />
        )}
        {activeTab === 'edit' && (
          <EditTab selectedUser={selectedUser} />
        )}
      </div>
    );
  }
}

export default HomePage;
