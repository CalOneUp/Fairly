import Input from './Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
  },
};

export const Default = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithValue = {
  args: {
    value: 'Some value',
  },
};