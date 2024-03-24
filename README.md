# yeahub-platform

## Scripts

- `npm run start` - Launching a frontend project on a webpack dev server
- `npm run build:prod` - Build in production mode
- `npm run build:dev` - Build in development mode
- `npm run prettier` - Correction files with a prettier
- `npm run lint:ts` - Checking ts files with a linter
- `npm run lint:ts:fix` - Correction ts files with a linter
- `npm run lint:css` - Checking css files with a style linter
- `npm run lint:css:fix` - Correction css files with a style linter
- `npm run prepare` - Pre-commit hooks
- `npm run storybook` - Start Storybook
- `npm run storybook:build` - Build Storybook
- `npm run test:ui` - Running screenshots of tests with loki
- `npm run test:ui:ok` - Confirmation of new screenshots
- `npm run test:unit` - Running unit tests with jest
- `npm run test:unit:coverage` - Determining test coverage

## Configuration

The project has a Webpack config - ./config/webpack

The project has a Storybook config - ./config/storybook

The project has a Jest config - ./config/jest

## Storybook

The project describes story cases for each component.

The story file is created next to the component with the .stories.tsx extension

You can run Storybook with the command:

- `npm run storybook`

Example:

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

const meta = {
  title: 'shared/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};
```
