import type { Meta, StoryObj } from '@storybook/react';

import { Widget } from './Widget';

const meta = {
  title: 'widget/Widget',
  component: Widget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Widget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
