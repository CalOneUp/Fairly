import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const AppHeader = ({ user }) => {
  return (
    <header className="glass-header border-b border-slate-200/50 p-4 sticky top-0 z-10 flex items-center justify-between">
      <div className="relative w-full max-w-xs">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <Input type="text" placeholder="Find anything..." className="pl-10" />
      </div>
      <div className="flex items-center gap-4">
        <button className="text-slate-500 hover:text-slate-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        </button>
        <div className="flex items-center gap-2">
          <img src={`https://placehold.co/32x32/E2E8F0/4A5568?text=${user.name.charAt(0)}`} className="w-8 h-8 rounded-full" alt="User profile" />
          <div>
            <p className="font-semibold text-sm text-slate-800">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

AppHeader.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default AppHeader;