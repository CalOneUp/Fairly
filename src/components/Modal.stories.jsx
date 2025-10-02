import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

export default {
  title: 'Components/Modal',
  component: Modal,
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is the content of the modal. You can put any React components here.</p>
        <div className="flex justify-end mt-4">
          <Button onClick={() => setIsOpen(false)} variant="primary">Close</Button>
        </div>
      </Modal>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Example Modal',
};