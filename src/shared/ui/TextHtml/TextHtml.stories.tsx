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
<h3>Заголовок H3</h3>
<h4>Заголовок H4</h4>
<h5>Заголовок H5</h5>
<h6>Заголовок H6</h6>

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
// Пример кода с подсветкой синтаксиса и скроллбаром
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

// Дополнительные строки для демонстрации скроллбара
function fetchUsers(): Promise<User[]> {
  return fetch('/api/users')
    .then(response => response.json())
    .then(data => data as User[]);
}

async function displayUsers() {
  try {
    const users = await fetchUsers();
    console.log(users);
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error);
  }
}
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
