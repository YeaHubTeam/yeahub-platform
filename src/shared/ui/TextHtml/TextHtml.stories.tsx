import type { Meta, StoryObj } from '@storybook/react';

import { TextHtml } from './TextHtml';

const meta = {
	title: 'Data Entry/TextHtml',
	component: TextHtml,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		html: { control: 'text' },
		disableCodeCopy: { control: 'boolean' },
	},
} satisfies Meta<typeof TextHtml>;

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
// Пример кода с подсветкой синтаксиса
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
</code>
</pre>
`;

export const Default: Story = {
	args: {
		html: defaultContent,
	},
};

export const WithoutCodeCopy: Story = {
	args: {
		html: defaultContent,
		disableCodeCopy: true,
	},
};
