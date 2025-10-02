import React, { useState } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';

const RepSmartLinkCard = ({ rep }) => {
  const repLink = `https://your-platform.com/${rep.name.split(' ').join('-').toLowerCase()}`;
  const [copyFeedback, setCopyFeedback] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(repLink);
    setCopyFeedback('Copied to clipboard!');
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  return (
    <Card>
      <h2 className="text-xl font-semibold text-slate-800 mb-2">🔗 My Smart Booking Link</h2>
      <p className="text-sm text-slate-500 mb-4">Use this link for intelligent scheduling.</p>
      <div className="flex items-center gap-2">
        <Input type="text" readOnly value={repLink} />
        <Button onClick={handleCopy} variant="primary" size="sm">📋 Copy</Button>
      </div>
      <p className="text-xs text-green-600 mt-2 h-4">{copyFeedback}</p>
    </Card>
  );
};

export default RepSmartLinkCard;