import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import ShapePage from './ShapePage';
import InitialGifScreen from './InitialGifScreen';
import NavigationBar from './NavigationBar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.render(
  <Router>
    <DndProvider backend={HTML5Backend}>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<InitialGifScreen />} />
        <Route path="/main" element={<App />} />
        <Route path="/shapes" element={<ShapePage />} />
      </Routes>
    </DndProvider>
  </Router>,
  document.getElementById('root')
);
