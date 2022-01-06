import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ActivityFeed from './components/ActivityFeed';
import ActivityDetail from './components/ActivityDetail';
import Archived from './components/Archived';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';


function App() {
  return (
      <Router>
            <Routes>
              <Route path="/" exact element={<ActivityFeed />} />
              <Route path="/activity/:activityId" exact element={<ActivityDetail />} />
              <Route path="/archived/" exact element={<Archived />} />
              <Route>404 Not Found</Route>
            </Routes>
      </Router>
  );
}

export default App;
