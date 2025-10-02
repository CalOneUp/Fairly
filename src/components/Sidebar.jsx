import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = ({ currentView, onNavigate }) => {
  const isAdminView = currentView === 'admin';

  const linkClasses = (isActive) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      isActive ? 'bg-violet-500/20 text-violet-700' : 'text-slate-600 hover:bg-slate-500/10'
    }`;

  return (
    <div className="w-64 glass-sidebar border-r border-slate-200/50 flex-shrink-0 flex flex-col">
      <div className="p-4 border-b border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-violet-500 rounded-lg flex items-center justify-center text-white font-logo text-2xl shadow-lg shadow-violet-500/30">F</div>
          <h1 className="text-2xl font-bold text-slate-800 font-logo">Fairly</h1>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('admin'); }} className={linkClasses(isAdminView)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM4 12a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM4 18a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2z"></path></svg>
          <span className="font-semibold">Admin Dashboard</span>
        </a>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('rep'); }} className={linkClasses(!isAdminView)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          <span className="font-semibold">My Dashboard</span>
        </a>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  currentView: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default Sidebar;