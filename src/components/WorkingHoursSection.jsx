import React from 'react';
import Card from './Card';
import Button from './Button';
import { mockTeams } from '../mockData';

const WorkingHoursSection = () => {
  const [buttonText, setButtonText] = React.useState('Save Changes');

  const handleSaveChanges = () => {
    setButtonText('Saved!');
    setTimeout(() => {
      setButtonText('Save Changes');
    }, 1500);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">⏰ Team Working Hours</h2>
      <div className="space-y-4">
        {mockTeams.flatMap(t => t.members).map(rep => (
          <div key={rep.id} className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 p-2 border-b border-slate-200/50">
            <p className="font-semibold text-slate-800">{rep.name}</p>
            <div className="flex items-center gap-2 col-span-2">
              <input
                type="time"
                defaultValue={rep.workingHours.start}
                className="working-hours-input bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm"
              />
              <span className="text-slate-500">-</span>
              <input
                type="time"
                defaultValue={rep.workingHours.end}
                className="working-hours-input bg-slate-100/80 border-transparent focus:ring-violet-500 focus:border-violet-500 rounded-lg w-full px-3 py-2 text-sm"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <Button onClick={handleSaveChanges} variant="primary">
          {buttonText}
        </Button>
      </div>
    </Card>
  );
};

export default WorkingHoursSection;