import React from 'react';
import Card from './Card';

const RepMyAllocationsCard = ({ myAllocations }) => {
  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">📚 My Recent Allocations</h2>
      <div className="h-96 overflow-y-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rationale</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/50">
            {myAllocations.map(log => {
              const statusColor = log.status.includes('Spam') || log.status.includes('No-show') ? 'bg-red-100 text-red-800' : log.status.includes('Qualified') ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800';
              return (
                <tr key={log.id}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{log.leadName}</div>
                    <div className="text-sm text-slate-500">{log.leadEmail}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 max-w-xs truncate">{log.rationale}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm">
                    <select
                      defaultValue={log.status}
                      className={`status-select bg-transparent font-semibold rounded-md border-0 focus:ring-2 focus:ring-violet-500 text-sm ${statusColor.replace('bg-', 'text-')}`}
                    >
                      <option>🗓️ Booked</option>
                      <option>✅ Qualified</option>
                      <option>❌ Not a Fit</option>
                      <option>👻 No-show</option>
                      <option>🗑️ Spam</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RepMyAllocationsCard;