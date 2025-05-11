import type { Meta, StoryObj } from '@storybook/react';

import { TextEditor } from './TextEditor';

const meta = {
	title: 'Data Entry/TextEditor',
	component: TextEditor,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		data: { control: 'text' },
		isInline: { control: 'boolean' },
		disabled: { control: 'boolean' },
	},
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultContent = `
<h1>Заголовок H1</h1>
<h2>Заголовок H2</h2>

<p>Обычный параграф текста с <strong>жирным</strong>, <em>курсивом</em> и <u>подчеркнутым</u> текстом.</p>

<ul>
  <li>Маркированный список</li>
  <li>С вложенным списком
    <ul>
      <li>Вложенный элемент 1</li>
      <li>Вложенный элемент 2</li>
    </ul>
  </li>
</ul>

<ol>
  <li>Нумерованный список</li>
  <li>С вложенным списком
    <ol>
      <li>Вложенный элемент 1</li>
      <li>Вложенный элемент 2</li>
    </ol>
  </li>
</ol>

<pre>
<code class="language-typescript">
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
</code></pre>
`;

export const Default: Story = {
	args: {
		data: defaultContent,
	},
};

export const Inline: Story = {
	args: {
		data: '<p>Инлайн редактор для небольших текстов</p>',
		isInline: true,
	},
};

export const Disabled: Story = {
	args: {
		data: defaultContent,
		disabled: true,
	},
};
