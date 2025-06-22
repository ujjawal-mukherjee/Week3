import React from 'react';
import { ThemeProvider } from './Context/ThemeContext';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import DataTable from './components/DashTable/DashTable';
import ChartComponent from './components/Charts/ChartComponent';
import CalendarComponent from './components/Calender/Calender';
import KanbanBoard from './components/Kanban/KanbanBoard';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tables" element={<DataTable />} />
              <Route path="/charts" element={<ChartComponent />} />
              <Route path="/calendar" element={<CalendarComponent />} />
              <Route path="/kanban" element={<KanbanBoard />} />
            </Routes>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;