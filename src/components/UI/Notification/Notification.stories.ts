import type { Meta, StoryObj } from '@storybook/react';
import Notification from './index';

const meta = {
  title: 'Utils/Notification',
  component: Notification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Notification>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Success message',
  },
};

export const Warning: Story = {
  args: {
    ...Success.args,
    type: 'warning',
    message: 'Warning message',
  },
};
