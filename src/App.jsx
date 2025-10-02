import { useState } from 'react';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import AdminDashboard from './components/AdminDashboard';
import RepDashboard from './components/RepDashboard';
import { mockTeams, mockAllocationLog, mockCalendarEvents } from './mockData';

function App() {
  const [currentView, setCurrentView] = useState('admin');
  const loggedInRepId = 101;
  const currentDate = new Date('2025-10-02T13:15:00+01:00');

  const rep = mockTeams.flatMap(t => t.members).find(m => m.id === loggedInRepId);
  const user = currentView === 'admin' ? { name: 'Admin User', email: 'admin@example.com' } : rep;
  const myAllocations = mockAllocationLog.filter(log => log.assignedToId === loggedInRepId).sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex h-screen bg-gradient-to-br from-purple-100 via-rose-50 to-blue-100 text-slate-800">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <AppHeader user={user} />
        <main className="flex-1 p-6 lg:p-8">
          {currentView === 'admin' ? (
            <AdminDashboard currentDate={currentDate} calendarEvents={mockCalendarEvents} />
          ) : (
            <RepDashboard
              rep={rep}
              myAllocations={myAllocations}
              currentDate={currentDate}
              calendarEvents={mockCalendarEvents}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;