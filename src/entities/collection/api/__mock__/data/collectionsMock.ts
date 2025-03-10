import { Collection } from '@/entities/collection/model/types/collection';

export const collectionsMock: Collection[] = [
	{
		createdAt: '2024-06-04T13:40:16.610Z',
		description: 'Cобеседование на мидл разработчика, вилка 250-300к',
		id: 12,
		imageSrc:
			'https://avatars.mds.yandex.net/i?id=ab1f3fd174b9dd0d8f5d3fb2247b6f339b0b8e20-4355070-images-thumbs&n=13',

		title: 'Сбер',
		updatedAt: '2024-12-28T17:14:21.662Z',
		questionsQuantity: 6,
		tariff: 'premium',
		keywords: ['async', 'defer', 'script'],
		specializations: [
			{
				id: 11,
				title: 'Frontend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
			{
				id: 12,
				title: 'Backend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
		],
		questions: [
			{
				id: 113,
				title: 'Зачем для тега <script> добавляют атрибуты async и defer?',
				description:
					'Этот вопрос проверяет понимание работы атрибутов async и defer в контексте загрузки и выполнения JavaScript-кода на веб-страницах.',
				code: null,
				imageSrc: null,
				keywords: ['async', 'defer', 'script'],
				longAnswer:
					'<p>При добавлении скриптов на страницу важно учитывать, как они могут повлиять на производительность и пользовательский опыт. По умолчанию, когда браузер встречает тег <code>&lt;script&gt;</code>, он приостанавливает рендеринг страницы, чтобы загрузить и выполнить скрипт, что может замедлить отображение контента.</p><p>&nbsp;</p><p>Атрибут <code>async</code> позволяет браузеру загружать скрипт асинхронно, что значит, что загрузка скрипта не блокирует рендеринг страницы. Как только скрипт загружен, он выполняется сразу, даже если HTML-документ еще не полностью загружен.</p><p>&nbsp;</p><p>Пример:</p><p><code>&lt;script src="script.js" async&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>Атрибут <code>defer</code>, в свою очередь, также загружает скрипт асинхронно, но откладывает его выполнение до тех пор, пока весь HTML-документ не будет загружен. Это позволяет гарантировать, что скрипт выполняется только после полной загрузки страницы.</p><p>&nbsp;</p><p>Пример:</p><p><code>&lt;script src="script.js" defer&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>Использование этих атрибутов позволяет оптимизировать время загрузки и улучшить пользовательский опыт, особенно на страницах с большим количеством скриптов или при наличии тяжелых JavaScript-фреймворков.</p>',
				shortAnswer:
					'<p>Атрибуты async и defer у тега &lt;script&gt; используются для управления тем, как и когда браузер загружает и выполняет JavaScript. async загружает скрипт асинхронно и выполняет его сразу после загрузки, не дожидаясь завершения загрузки всей страницы. defer также загружает скрипт асинхронно, но откладывает его выполнение до полной загрузки HTML-документа, что предотвращает блокировку рендеринга страницы.</p>',
				status: 'public',
				rate: 4,
				complexity: 6,
				createdAt: '2024-10-10T16:46:51.672Z',
				updatedAt: '2024-10-10T16:46:51.672Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy: null,
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
			{
				id: 119,
				title:
					'Как работает Shadow DOM? Какие преимущества он дает для разработки веб-компонентов?',
				description:
					'Этот вопрос проверяет понимание концепции Shadow DOM и его роли в создании веб-компонентов, а также преимущества, которые он предоставляет разработчикам.',
				code: null,
				imageSrc: null,
				keywords: ['shadow dom'],
				longAnswer:
					"<p>Shadow DOM — это технология, которая позволяет создавать \"теневой\" DOM внутри элемента, обеспечивая изоляцию его содержимого и стилей от основного документа. Это позволяет разработчикам создавать веб-компоненты, которые могут содержать собственные стили и элементы, не затрагивая другие части страницы. Shadow DOM делает элементы более независимыми и переиспользуемыми.</p><p>&nbsp;</p><p>Когда вы создаете Shadow DOM для элемента, например, с помощью метода <code>attachShadow()</code>, создается новый контекст, который не наследует стили и скрипты от внешнего документа. Вот пример кода, который демонстрирует создание Shadow DOM:</p><p>&nbsp;</p><p><code>class MyElement extends HTMLElement {\n &nbsp; &nbsp;constructor() {\n &nbsp; &nbsp; &nbsp; &nbsp;super();\n &nbsp; &nbsp; &nbsp; &nbsp;const shadow = this.attachShadow({ mode: 'open' });\n &nbsp; &nbsp; &nbsp; &nbsp;shadow.innerHTML = `\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;style&gt;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;p {\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;color: blue;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/style&gt;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;p&gt;Hello from Shadow DOM!&lt;/p&gt;\n &nbsp; &nbsp; &nbsp; &nbsp;`;\n &nbsp; &nbsp;}\n}\n\ncustomElements.define('my-element', MyElement);\n</code></p><p>&nbsp;</p><p><strong>Преимущества Shadow DOM:</strong></p><ol><li><strong>Изоляция стилей:</strong> Стили внутри Shadow DOM не конфликтуют с глобальными стилями, что делает его идеальным для разработки компонентов.</li><li><strong>Инкапсуляция:</strong> Все, что находится внутри Shadow DOM, скрыто от внешнего окружения, что уменьшает вероятность конфликтов и ошибок.</li><li><strong>Переиспользуемость:</strong> Компоненты с Shadow DOM могут быть легко переиспользованы в разных частях приложения, обеспечивая консистентность и упрощая поддержку.</li></ol><p>&nbsp;</p><p>Таким образом, Shadow DOM является мощным инструментом для разработки веб-компонентов, который обеспечивает инкапсуляцию и защиту от конфликтов стилей.</p>",
				shortAnswer:
					'<p><strong>Shadow DOM</strong> создает изолированное дерево DOM для веб-компонента, которое скрыто от остальной части документа.</p><p>&nbsp;</p><p>Плюсы:</p><ol><li><strong>• Изолирует стили и разметку.</strong></li><li><strong>•&nbsp;Упрощает повторное использование.</strong></li><li><strong>•&nbsp;Инкапсулирует логику.</strong></li></ol>',
				status: 'public',
				rate: 3,
				complexity: 6,
				createdAt: '2024-10-11T15:59:35.247Z',
				updatedAt: '2024-10-28T15:44:05.373Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy:
					'{"userId":"bc475b16-8d73-4dd1-9cb9-5214feca6eae","firstName":"Дарья","lastName":"Крутова"}',
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
			{
				id: 123,
				title:
					'Как работают форматы ввода и валидация данных в HTML5? В чем различие между встроенной и кастомной валидацией?',
				description:
					'Этот вопрос проверяет понимание различных форматов ввода в HTML5 и механизмов валидации данных. Также он выясняет, как встроенная и кастомная валидация отличаются друг от друга.',
				code: null,
				imageSrc: null,
				keywords: ['input', 'validation', 'form'],
				longAnswer:
					'<p>HTML5 ввел множество новых типов ввода и улучшил механизм валидации данных в формах. Это позволяет разработчикам создавать более интерактивные и удобные веб-приложения с меньшими затратами времени на написание пользовательского кода.</p><p>&nbsp;</p><p><strong>Форматы ввода в HTML5:</strong><br>Некоторые новые типы ввода включают:</p><ul><li><code>&lt;input type="email"&gt;</code>: Проверяет, что введенное значение имеет формат email (например, user@example.com).</li><li><code>&lt;input type="url"&gt;</code>: Проверяет, что введенное значение соответствует формату URL (например, <a href="https://example.com">https://example.com</a>).</li><li><code>&lt;input type="number"&gt;</code>: Ограничивает ввод только числами и может включать атрибуты для задания диапазона (например, <code>min</code> и <code>max</code>).</li></ul><p>&nbsp;</p><p><strong>Встроенная валидация:</strong><br>HTML5 обеспечивает встроенную валидацию форм, которая происходит автоматически при отправке. Если данные не соответствуют установленным требованиям (например, неправильный формат email), браузер покажет сообщение об ошибке и предотвратит отправку формы. Например:</p><p>&nbsp;</p><p><code>&lt;form&gt;\n &nbsp; &nbsp;&lt;label for="email"&gt;Email:&lt;/label&gt;\n &nbsp; &nbsp;&lt;input type="email" id="email" required&gt;\n &nbsp; &nbsp;&lt;button type="submit"&gt;Отправить&lt;/button&gt;\n&lt;/form&gt;\n</code></p><p>&nbsp;</p><p>Если пользователь введет неверный email, браузер уведомит его об этом.</p><p>&nbsp;</p><p><strong>Кастомная валидация:</strong><br>Кастомная валидация позволяет разработчикам добавлять собственные правила проверки данных. Это делается с помощью JavaScript и событий, таких как <code>submit</code> или <code>input</code>. Например, вы можете создать проверку на основе определенного условия:</p><p>&nbsp;</p><p><code>const form = document.querySelector(\'form\');\nform.addEventListener(\'submit\', function(event) {\n &nbsp; &nbsp;const email = document.getElementById(\'email\').value;\n &nbsp; &nbsp;if (!email.endsWith(\'@example.com\')) {\n &nbsp; &nbsp; &nbsp; &nbsp;alert(\'Email должен заканчиваться на @example.com\');\n &nbsp; &nbsp; &nbsp; &nbsp;event.preventDefault(); // предотвращает отправку формы\n &nbsp; &nbsp;}\n});\n</code></p><p>&nbsp;</p><p><strong>Сравнение:</strong></p><ul><li><strong>Встроенная валидация:</strong> Автоматическая проверка данных на соответствие заданным типам, без необходимости писать дополнительный код.</li><li><strong>Кастомная валидация:</strong> Позволяет создавать более сложные и специфичные проверки, которые не могут быть выполнены стандартными средствами.</li></ul><p>&nbsp;</p><p>Оба подхода могут использоваться вместе для обеспечения наилучшего пользовательского опыта и повышения качества вводимых данных.</p>',
				shortAnswer:
					'<p>HTML5 предоставляет различные форматы ввода, такие как <code>&lt;input type="email"&gt;</code>, <code>&lt;input type="url"&gt;</code> и <code>&lt;input type="number"&gt;</code>, которые автоматически проверяют вводимые данные на соответствие определенным критериям. Встроенная валидация происходит автоматически при отправке формы, и браузер уведомляет пользователя об ошибках, если данные не соответствуют формату. Кастомная валидация, с другой стороны, позволяет разработчикам создавать свои собственные правила проверки данных с помощью JavaScript, что дает больше контроля и гибкости.</p>',
				status: 'public',
				rate: 2,
				complexity: 5,
				createdAt: '2024-10-11T16:09:09.969Z',
				updatedAt: '2024-10-11T16:09:09.969Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy: null,
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
		],
	},
	{
		createdAt: '2024-07-15T09:22:34.123Z',
		description: 'Собеседование на senior разработчика, вилка 400-500к',
		id: 13,
		imageSrc:
			'https://avatars.mds.yandex.net/i?id=17dd12b49e0cdf3506978885f761225687d566f2-8497452-images-thumbs&n=13',
		title: 'Яндекс',
		updatedAt: '2024-11-10T14:55:12.345Z',
		questionsQuantity: 8,
		tariff: 'free',
		keywords: ['async', 'defer', 'script'],
		specializations: [
			{
				id: 11,
				title: 'Frontend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
			{
				id: 12,
				title: 'Backend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
		],
		questions: [
			{
				id: 113,
				title: 'Зачем для тега <script> добавляют атрибуты async и defer?',
				description:
					'Этот вопрос проверяет понимание работы атрибутов async и defer в контексте загрузки и выполнения JavaScript-кода на веб-страницах.',
				code: null,
				imageSrc: null,
				keywords: ['async', 'defer', 'script'],
				longAnswer:
					'<p>При добавлении скриптов на страницу важно учитывать, как они могут повлиять на производительность и пользовательский опыт. По умолчанию, когда браузер встречает тег <code>&lt;script&gt;</code>, он приостанавливает рендеринг страницы, чтобы загрузить и выполнить скрипт, что может замедлить отображение контента.</p><p>&nbsp;</p><p>Атрибут <code>async</code> позволяет браузеру загружать скрипт асинхронно, что значит, что загрузка скрипта не блокирует рендеринг страницы. Как только скрипт загружен, он выполняется сразу, даже если HTML-документ еще не полностью загружен.</p><p>&nbsp;</p><p>Пример:</p><p><code>&lt;script src="script.js" async&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>Атрибут <code>defer</code>, в свою очередь, также загружает скрипт асинхронно, но откладывает его выполнение до тех пор, пока весь HTML-документ не будет загружен. Это позволяет гарантировать, что скрипт выполняется только после полной загрузки страницы.</p><p>&nbsp;</p><p>Пример:</p><p><code>&lt;script src="script.js" defer&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>Использование этих атрибутов позволяет оптимизировать время загрузки и улучшить пользовательский опыт, особенно на страницах с большим количеством скриптов или при наличии тяжелых JavaScript-фреймворков.</p>',
				shortAnswer:
					'<p>Атрибуты async и defer у тега &lt;script&gt; используются для управления тем, как и когда браузер загружает и выполняет JavaScript. async загружает скрипт асинхронно и выполняет его сразу после загрузки, не дожидаясь завершения загрузки всей страницы. defer также загружает скрипт асинхронно, но откладывает его выполнение до полной загрузки HTML-документа, что предотвращает блокировку рендеринга страницы.</p>',
				status: 'public',
				rate: 4,
				complexity: 6,
				createdAt: '2024-10-10T16:46:51.672Z',
				updatedAt: '2024-10-10T16:46:51.672Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy: null,
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
			{
				id: 119,
				title:
					'Как работает Shadow DOM? Какие преимущества он дает для разработки веб-компонентов?',
				description:
					'Этот вопрос проверяет понимание концепции Shadow DOM и его роли в создании веб-компонентов, а также преимущества, которые он предоставляет разработчикам.',
				code: null,
				imageSrc: null,
				keywords: ['shadow dom'],
				longAnswer:
					"<p>Shadow DOM — это технология, которая позволяет создавать \"теневой\" DOM внутри элемента, обеспечивая изоляцию его содержимого и стилей от основного документа. Это позволяет разработчикам создавать веб-компоненты, которые могут содержать собственные стили и элементы, не затрагивая другие части страницы. Shadow DOM делает элементы более независимыми и переиспользуемыми.</p><p>&nbsp;</p><p>Когда вы создаете Shadow DOM для элемента, например, с помощью метода <code>attachShadow()</code>, создается новый контекст, который не наследует стили и скрипты от внешнего документа. Вот пример кода, который демонстрирует создание Shadow DOM:</p><p>&nbsp;</p><p><code>class MyElement extends HTMLElement {\n &nbsp; &nbsp;constructor() {\n &nbsp; &nbsp; &nbsp; &nbsp;super();\n &nbsp; &nbsp; &nbsp; &nbsp;const shadow = this.attachShadow({ mode: 'open' });\n &nbsp; &nbsp; &nbsp; &nbsp;shadow.innerHTML = `\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;style&gt;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;p {\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;color: blue;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/style&gt;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;p&gt;Hello from Shadow DOM!&lt;/p&gt;\n &nbsp; &nbsp; &nbsp; &nbsp;`;\n &nbsp; &nbsp;}\n}\n\ncustomElements.define('my-element', MyElement);\n</code></p><p>&nbsp;</p><p><strong>Преимущества Shadow DOM:</strong></p><ol><li><strong>Изоляция стилей:</strong> Стили внутри Shadow DOM не конфликтуют с глобальными стилями, что делает его идеальным для разработки компонентов.</li><li><strong>Инкапсуляция:</strong> Все, что находится внутри Shadow DOM, скрыто от внешнего окружения, что уменьшает вероятность конфликтов и ошибок.</li><li><strong>Переиспользуемость:</strong> Компоненты с Shadow DOM могут быть легко переиспользованы в разных частях приложения, обеспечивая консистентность и упрощая поддержку.</li></ol><p>&nbsp;</p><p>Таким образом, Shadow DOM является мощным инструментом для разработки веб-компонентов, который обеспечивает инкапсуляцию и защиту от конфликтов стилей.</p>",
				shortAnswer:
					'<p><strong>Shadow DOM</strong> создает изолированное дерево DOM для веб-компонента, которое скрыто от остальной части документа.</p><p>&nbsp;</p><p>Плюсы:</p><ol><li><strong>• Изолирует стили и разметку.</strong></li><li><strong>•&nbsp;Упрощает повторное использование.</strong></li><li><strong>•&nbsp;Инкапсулирует логику.</strong></li></ol>',
				status: 'public',
				rate: 3,
				complexity: 6,
				createdAt: '2024-10-11T15:59:35.247Z',
				updatedAt: '2024-10-28T15:44:05.373Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy:
					'{"userId":"bc475b16-8d73-4dd1-9cb9-5214feca6eae","firstName":"Дарья","lastName":"Крутова"}',
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
			{
				id: 123,
				title:
					'Как работают форматы ввода и валидация данных в HTML5? В чем различие между встроенной и кастомной валидацией?',
				description:
					'Этот вопрос проверяет понимание различных форматов ввода в HTML5 и механизмов валидации данных. Также он выясняет, как встроенная и кастомная валидация отличаются друг от друга.',
				code: null,
				imageSrc: null,
				keywords: ['input', 'validation', 'form'],
				longAnswer:
					'<p>HTML5 ввел множество новых типов ввода и улучшил механизм валидации данных в формах. Это позволяет разработчикам создавать более интерактивные и удобные веб-приложения с меньшими затратами времени на написание пользовательского кода.</p><p>&nbsp;</p><p><strong>Форматы ввода в HTML5:</strong><br>Некоторые новые типы ввода включают:</p><ul><li><code>&lt;input type="email"&gt;</code>: Проверяет, что введенное значение имеет формат email (например, user@example.com).</li><li><code>&lt;input type="url"&gt;</code>: Проверяет, что введенное значение соответствует формату URL (например, <a href="https://example.com">https://example.com</a>).</li><li><code>&lt;input type="number"&gt;</code>: Ограничивает ввод только числами и может включать атрибуты для задания диапазона (например, <code>min</code> и <code>max</code>).</li></ul><p>&nbsp;</p><p><strong>Встроенная валидация:</strong><br>HTML5 обеспечивает встроенную валидацию форм, которая происходит автоматически при отправке. Если данные не соответствуют установленным требованиям (например, неправильный формат email), браузер покажет сообщение об ошибке и предотвратит отправку формы. Например:</p><p>&nbsp;</p><p><code>&lt;form&gt;\n &nbsp; &nbsp;&lt;label for="email"&gt;Email:&lt;/label&gt;\n &nbsp; &nbsp;&lt;input type="email" id="email" required&gt;\n &nbsp; &nbsp;&lt;button type="submit"&gt;Отправить&lt;/button&gt;\n&lt;/form&gt;\n</code></p><p>&nbsp;</p><p>Если пользователь введет неверный email, браузер уведомит его об этом.</p><p>&nbsp;</p><p><strong>Кастомная валидация:</strong><br>Кастомная валидация позволяет разработчикам добавлять собственные правила проверки данных. Это делается с помощью JavaScript и событий, таких как <code>submit</code> или <code>input</code>. Например, вы можете создать проверку на основе определенного условия:</p><p>&nbsp;</p><p><code>const form = document.querySelector(\'form\');\nform.addEventListener(\'submit\', function(event) {\n &nbsp; &nbsp;const email = document.getElementById(\'email\').value;\n &nbsp; &nbsp;if (!email.endsWith(\'@example.com\')) {\n &nbsp; &nbsp; &nbsp; &nbsp;alert(\'Email должен заканчиваться на @example.com\');\n &nbsp; &nbsp; &nbsp; &nbsp;event.preventDefault(); // предотвращает отправку формы\n &nbsp; &nbsp;}\n});\n</code></p><p>&nbsp;</p><p><strong>Сравнение:</strong></p><ul><li><strong>Встроенная валидация:</strong> Автоматическая проверка данных на соответствие заданным типам, без необходимости писать дополнительный код.</li><li><strong>Кастомная валидация:</strong> Позволяет создавать более сложные и специфичные проверки, которые не могут быть выполнены стандартными средствами.</li></ul><p>&nbsp;</p><p>Оба подхода могут использоваться вместе для обеспечения наилучшего пользовательского опыта и повышения качества вводимых данных.</p>',
				shortAnswer:
					'<p>HTML5 предоставляет различные форматы ввода, такие как <code>&lt;input type="email"&gt;</code>, <code>&lt;input type="url"&gt;</code> и <code>&lt;input type="number"&gt;</code>, которые автоматически проверяют вводимые данные на соответствие определенным критериям. Встроенная валидация происходит автоматически при отправке формы, и браузер уведомляет пользователя об ошибках, если данные не соответствуют формату. Кастомная валидация, с другой стороны, позволяет разработчикам создавать свои собственные правила проверки данных с помощью JavaScript, что дает больше контроля и гибкости.</p>',
				status: 'public',
				rate: 2,
				complexity: 5,
				createdAt: '2024-10-11T16:09:09.969Z',
				updatedAt: '2024-10-11T16:09:09.969Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy: null,
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
		],
	},
	{
		createdAt: '2024-08-20T18:45:56.789Z',
		description: 'Собеседование на junior разработчика, вилка 150-200к',
		id: 14,
		imageSrc: 'https://goldenpark.su/upload/iblock/1b9/out_t_bank.jpg',
		title: 'Т-Банк',
		updatedAt: '2024-09-25T10:30:45.678Z',
		questionsQuantity: 5,
		tariff: 'premium',
		keywords: ['async', 'defer', 'script'],
		specializations: [
			{
				id: 11,
				title: 'Frontend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
			{
				id: 12,
				title: 'Backend',
				description: 'Frontend-разработчик',
				imageSrc: null,
				createdAt: '2024-10-03T09:08:10.605Z',
				updatedAt: '2024-11-02T06:46:12.745Z',
			},
		],
		questions: [
			{
				id: 113,
				title: 'Зачем для тега <script> добавляют атрибуты async и defer?',
				description:
					'Этот вопрос проверяет понимание работы атрибутов async и defer в контексте загрузки и выполнения JavaScript-кода на веб-страницах.',
				code: null,
				imageSrc: null,
				keywords: ['async', 'defer', 'script'],
				longAnswer:
					'<p>При добавлении скриптов на страницу важно учитывать, как они могут повлиять на производительность и пользовательский опыт. По умолчанию, когда браузер встречает тег <code>&lt;script&gt;</code>, он приостанавливает рендеринг страницы, чтобы загрузить и выполнить скрипт, что может замедлить отображение контента.</p><p>&nbsp;</p><p>Атрибут <code>async</code> позволяет браузеру загружать скрипт асинхронно, что значит, что загрузка скрипта не блокирует рендеринг страницы. Как только скрипт загружен, он выполняется сразу, даже если HTML-документ еще не полностью загружен.</p><p>&nbsp;</p><p>Пример:</p><p><code>&lt;script src="script.js" async&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>Атрибут <code>defer</code>, в свою очередь, также загружает скрипт асинхронно, но откладывает его выполнение до тех пор, пока весь HTML-документ не будет загружен. Это позволяет гарантировать, что скрипт выполняется только после полной загрузки страницы.</p><p>&nbsp;</p><p>Пример:</p><p><code>&lt;script src="script.js" defer&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>Использование этих атрибутов позволяет оптимизировать время загрузки и улучшить пользовательский опыт, особенно на страницах с большим количеством скриптов или при наличии тяжелых JavaScript-фреймворков.</p>',
				shortAnswer:
					'<p>Атрибуты async и defer у тега &lt;script&gt; используются для управления тем, как и когда браузер загружает и выполняет JavaScript. async загружает скрипт асинхронно и выполняет его сразу после загрузки, не дожидаясь завершения загрузки всей страницы. defer также загружает скрипт асинхронно, но откладывает его выполнение до полной загрузки HTML-документа, что предотвращает блокировку рендеринга страницы.</p>',
				status: 'public',
				rate: 4,
				complexity: 6,
				createdAt: '2024-10-10T16:46:51.672Z',
				updatedAt: '2024-10-10T16:46:51.672Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy: null,
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
			{
				id: 119,
				title:
					'Как работает Shadow DOM? Какие преимущества он дает для разработки веб-компонентов?',
				description:
					'Этот вопрос проверяет понимание концепции Shadow DOM и его роли в создании веб-компонентов, а также преимущества, которые он предоставляет разработчикам.',
				code: null,
				imageSrc: null,
				keywords: ['shadow dom'],
				longAnswer:
					"<p>Shadow DOM — это технология, которая позволяет создавать \"теневой\" DOM внутри элемента, обеспечивая изоляцию его содержимого и стилей от основного документа. Это позволяет разработчикам создавать веб-компоненты, которые могут содержать собственные стили и элементы, не затрагивая другие части страницы. Shadow DOM делает элементы более независимыми и переиспользуемыми.</p><p>&nbsp;</p><p>Когда вы создаете Shadow DOM для элемента, например, с помощью метода <code>attachShadow()</code>, создается новый контекст, который не наследует стили и скрипты от внешнего документа. Вот пример кода, который демонстрирует создание Shadow DOM:</p><p>&nbsp;</p><p><code>class MyElement extends HTMLElement {\n &nbsp; &nbsp;constructor() {\n &nbsp; &nbsp; &nbsp; &nbsp;super();\n &nbsp; &nbsp; &nbsp; &nbsp;const shadow = this.attachShadow({ mode: 'open' });\n &nbsp; &nbsp; &nbsp; &nbsp;shadow.innerHTML = `\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;style&gt;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;p {\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;color: blue;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;}\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;/style&gt;\n &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&lt;p&gt;Hello from Shadow DOM!&lt;/p&gt;\n &nbsp; &nbsp; &nbsp; &nbsp;`;\n &nbsp; &nbsp;}\n}\n\ncustomElements.define('my-element', MyElement);\n</code></p><p>&nbsp;</p><p><strong>Преимущества Shadow DOM:</strong></p><ol><li><strong>Изоляция стилей:</strong> Стили внутри Shadow DOM не конфликтуют с глобальными стилями, что делает его идеальным для разработки компонентов.</li><li><strong>Инкапсуляция:</strong> Все, что находится внутри Shadow DOM, скрыто от внешнего окружения, что уменьшает вероятность конфликтов и ошибок.</li><li><strong>Переиспользуемость:</strong> Компоненты с Shadow DOM могут быть легко переиспользованы в разных частях приложения, обеспечивая консистентность и упрощая поддержку.</li></ol><p>&nbsp;</p><p>Таким образом, Shadow DOM является мощным инструментом для разработки веб-компонентов, который обеспечивает инкапсуляцию и защиту от конфликтов стилей.</p>",
				shortAnswer:
					'<p><strong>Shadow DOM</strong> создает изолированное дерево DOM для веб-компонента, которое скрыто от остальной части документа.</p><p>&nbsp;</p><p>Плюсы:</p><ol><li><strong>• Изолирует стили и разметку.</strong></li><li><strong>•&nbsp;Упрощает повторное использование.</strong></li><li><strong>•&nbsp;Инкапсулирует логику.</strong></li></ol>',
				status: 'public',
				rate: 3,
				complexity: 6,
				createdAt: '2024-10-11T15:59:35.247Z',
				updatedAt: '2024-10-28T15:44:05.373Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy:
					'{"userId":"bc475b16-8d73-4dd1-9cb9-5214feca6eae","firstName":"Дарья","lastName":"Крутова"}',
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
			{
				id: 123,
				title:
					'Как работают форматы ввода и валидация данных в HTML5? В чем различие между встроенной и кастомной валидацией?',
				description:
					'Этот вопрос проверяет понимание различных форматов ввода в HTML5 и механизмов валидации данных. Также он выясняет, как встроенная и кастомная валидация отличаются друг от друга.',
				code: null,
				imageSrc: null,
				keywords: ['input', 'validation', 'form'],
				longAnswer:
					'<p>HTML5 ввел множество новых типов ввода и улучшил механизм валидации данных в формах. Это позволяет разработчикам создавать более интерактивные и удобные веб-приложения с меньшими затратами времени на написание пользовательского кода.</p><p>&nbsp;</p><p><strong>Форматы ввода в HTML5:</strong><br>Некоторые новые типы ввода включают:</p><ul><li><code>&lt;input type="email"&gt;</code>: Проверяет, что введенное значение имеет формат email (например, user@example.com).</li><li><code>&lt;input type="url"&gt;</code>: Проверяет, что введенное значение соответствует формату URL (например, <a href="https://example.com">https://example.com</a>).</li><li><code>&lt;input type="number"&gt;</code>: Ограничивает ввод только числами и может включать атрибуты для задания диапазона (например, <code>min</code> и <code>max</code>).</li></ul><p>&nbsp;</p><p><strong>Встроенная валидация:</strong><br>HTML5 обеспечивает встроенную валидацию форм, которая происходит автоматически при отправке. Если данные не соответствуют установленным требованиям (например, неправильный формат email), браузер покажет сообщение об ошибке и предотвратит отправку формы. Например:</p><p>&nbsp;</p><p><code>&lt;form&gt;\n &nbsp; &nbsp;&lt;label for="email"&gt;Email:&lt;/label&gt;\n &nbsp; &nbsp;&lt;input type="email" id="email" required&gt;\n &nbsp; &nbsp;&lt;button type="submit"&gt;Отправить&lt;/button&gt;\n&lt;/form&gt;\n</code></p><p>&nbsp;</p><p>Если пользователь введет неверный email, браузер уведомит его об этом.</p><p>&nbsp;</p><p><strong>Кастомная валидация:</strong><br>Кастомная валидация позволяет разработчикам добавлять собственные правила проверки данных. Это делается с помощью JavaScript и событий, таких как <code>submit</code> или <code>input</code>. Например, вы можете создать проверку на основе определенного условия:</p><p>&nbsp;</p><p><code>const form = document.querySelector(\'form\');\nform.addEventListener(\'submit\', function(event) {\n &nbsp; &nbsp;const email = document.getElementById(\'email\').value;\n &nbsp; &nbsp;if (!email.endsWith(\'@example.com\')) {\n &nbsp; &nbsp; &nbsp; &nbsp;alert(\'Email должен заканчиваться на @example.com\');\n &nbsp; &nbsp; &nbsp; &nbsp;event.preventDefault(); // предотвращает отправку формы\n &nbsp; &nbsp;}\n});\n</code></p><p>&nbsp;</p><p><strong>Сравнение:</strong></p><ul><li><strong>Встроенная валидация:</strong> Автоматическая проверка данных на соответствие заданным типам, без необходимости писать дополнительный код.</li><li><strong>Кастомная валидация:</strong> Позволяет создавать более сложные и специфичные проверки, которые не могут быть выполнены стандартными средствами.</li></ul><p>&nbsp;</p><p>Оба подхода могут использоваться вместе для обеспечения наилучшего пользовательского опыта и повышения качества вводимых данных.</p>',
				shortAnswer:
					'<p>HTML5 предоставляет различные форматы ввода, такие как <code>&lt;input type="email"&gt;</code>, <code>&lt;input type="url"&gt;</code> и <code>&lt;input type="number"&gt;</code>, которые автоматически проверяют вводимые данные на соответствие определенным критериям. Встроенная валидация происходит автоматически при отправке формы, и браузер уведомляет пользователя об ошибках, если данные не соответствуют формату. Кастомная валидация, с другой стороны, позволяет разработчикам создавать свои собственные правила проверки данных с помощью JavaScript, что дает больше контроля и гибкости.</p>',
				status: 'public',
				rate: 2,
				complexity: 5,
				createdAt: '2024-10-11T16:09:09.969Z',
				updatedAt: '2024-10-11T16:09:09.969Z',
				createdBy:
					'{"userId":"0a1438a3-1776-43b4-9a95-e60ee6573903","firstName":"Руслан","lastName":"Куянец"}',
				updatedBy: null,
				questionSpecializations: [
					{
						id: 11,
						title: 'Frontend',
						description: 'Frontend-разработчик',
						imageSrc: null,
						createdAt: '2024-10-03T09:08:10.605Z',
						updatedAt: '2024-11-02T06:46:12.745Z',
					},
				],
				questionSkills: [
					{
						id: 27,
						title: 'HTML',
						description:
							'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
						imageSrc: null,
						createdAt: '2024-10-06T06:32:23.656Z',
						updatedAt: '2024-10-06T06:32:23.656Z',
					},
					{
						id: 2,
						title: 'JavaScript',
						description:
							'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
						imageSrc: null,
						createdAt: '2024-06-04T13:40:16.610Z',
						updatedAt: '2024-11-01T21:33:13.635Z',
					},
				],
				checksCount: 0,
				isLearned: false,
			},
		],
	},
];
