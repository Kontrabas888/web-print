import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import App from './App';
import ShapePage from './ShapePage';
import NavigationBar from './NavigationBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <Router basename="/web-print">
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/main" />} />
        <Route path="/" element={<><NavigationBar /><Outlet /></>}>
          <Route path="main" element={<App />} />
          <Route path="shapes" element={<ShapePage />} />
        </Route>
      </Routes>
    </DndProvider>
  </Router>,
  document.getElementById('root')
);
