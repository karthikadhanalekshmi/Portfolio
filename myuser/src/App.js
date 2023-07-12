import React, { useState } from 'react';
import UserGrid from './UserGrid';
import { Tab, Tabs, Box } from '@mui/material';

function App() {
  const [activeTab, setActiveTab] = useState('view');

  const handleTabChange = (event, newTab) => {
    setActiveTab(newTab);
  };

  return (
    <div className="App">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="View" value="view" />
          <Tab label="Edit" value="edit" />
        </Tabs>
      </Box>
      {activeTab === 'view' ? <UserGrid /> : <h2>Edit Tab Content</h2>}
    </div>
  );
}

export default App;
