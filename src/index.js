import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginView from './routes/Login&SignOut/LoginView';
import DashboardView from './routes/Dashboard/DashboardView';
import EditProfile from './routes/EditProfile/EditProfile.jsx';
import SignOutView from './routes/Login&SignOut/SignOutView';
import PublicProfileView from './routes/PublicProfileView/PublicProfileView';
import ChooseUsernameView from './routes/ChooseUsernameView/ChooseUsernameView';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="login" element={<LoginView/>} />
      <Route path="dashboard" element={<DashboardView/>} />
      <Route path="dashboard/profile" element={<EditProfile/>} />
      <Route path="signout" element={<SignOutView/>} />
      <Route path="u/:username" element={<PublicProfileView/>} />
      <Route path="choose-username" element={<ChooseUsernameView/>} />
    </Routes>
  </BrowserRouter>
);
