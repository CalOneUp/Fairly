import React from 'react';
import Card from './Card';
import { mockEventTypes, mockTeams } from '../mockData';

const RoutingSection = () => {
  const getConditionText = (cond) => {
    const conditionMap = { 'gt': '>', 'lte': '≤', 'eq': '=' };
    const fieldMap = { 'companySize': 'Company Size' };
    return `${fieldMap[cond.field] || cond.field} ${conditionMap[cond.condition]} ${cond.value}`;
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">🧠 Routing Rules</h2>
      <div className="space-y-6">
        {mockEventTypes.map(event => {
          const catchAllTeam = mockTeams.find(t => t.id === event.catchAllTeamId);
          return (
            <div key={event.id} className="border border-slate-200/50 p-4 rounded-2xl">
              <h3 className="font-semibold text-slate-800">{event.name}</h3>
              <div className="mt-4">
                {event.rules.map((ruleGroup, index) => {
                  const team = mockTeams.find(t => t.id === ruleGroup.teamId);
                  const conditionsHtml = ruleGroup.conditions.map(getConditionText).join('<span class="font-bold text-slate-500 mx-2">AND</span>');
                  return (
                    <React.Fragment key={index}>
                      <div className="p-3 bg-slate-500/10 rounded-xl">
                        <p className="text-sm text-slate-600">
                          <span className="font-semibold text-slate-500">IF</span>
                          <span dangerouslySetInnerHTML={{ __html: ` ${conditionsHtml} ` }} />
                          <span className="font-semibold text-slate-500">THEN</span> route to <span className="font-medium text-violet-600">{team ? team.name : 'N/A'}</span>
                        </p>
                      </div>
                      {index < event.rules.length - 1 && <div className="text-center my-2 text-slate-400 font-semibold text-sm">OR</div>}
                    </React.Fragment>
                  );
                })}
              </div>
              <div className="mt-3 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl">
                <p className="text-sm text-violet-700">
                  <span className="font-semibold text-violet-800">Catch-all:</span> If no rules match, route to <span className="font-medium text-violet-600">{catchAllTeam ? catchAllTeam.name : 'None'}</span>.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RoutingSection;