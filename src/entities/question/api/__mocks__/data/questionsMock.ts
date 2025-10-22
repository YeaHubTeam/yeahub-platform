import { Response } from '@/shared/types/types';

import { MostDifficultQuestionsResponse, Question } from '@/entities/question/model/types/question';

export const questionsMock: Response<Question[]> = {
	data: [
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
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			title: 'Как работает Shadow DOM? Какие преимущества он дает для разработки веб-компонентов?',
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
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
			updatedBy: {
				id: 'bc475b16-8d73-4dd1-9cb9-5214feca6eae',
				username: 'daryakrutova',
			},
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
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 126,
			title:
				'Что такое <template> и <slot>, как их использовать при создании кастомных элементов и динамических структур на странице?',
			description:
				'Этот вопрос проверяет знание HTML5 о шаблонах и слотовых элементах, а также их роли в создании кастомных элементов. Он также исследует, как эти функции способствуют динамическому изменению структуры страницы.',
			code: null,
			imageSrc: null,
			keywords: ['template', 'slot', 'шаблон'],
			longAnswer:
				'<p>HTML5 ввел элементы <code>&lt;template&gt;</code> и <code>&lt;slot&gt;</code>, которые значительно упрощают создание динамических интерфейсов и кастомных элементов. Эти инструменты помогают разработчикам эффективно управлять содержимым страницы и создавать переиспользуемые компоненты.</p><p>&nbsp;</p><ol><li><p><strong>Элемент </strong><code><strong>&lt;template&gt;</strong></code><strong>:</strong><br>Этот элемент используется для определения фрагмента HTML, который не будет отображаться на странице, пока он не будет активирован. Это полезно для создания динамического содержимого без непосредственного отображения в DOM. Пример:</p><p>&nbsp;</p><p><code>&lt;template id="myTemplate"&gt;\n &nbsp; &nbsp;&lt;div class="item"&gt;Элемент списка&lt;/div&gt;\n&lt;/template&gt;\n</code></p><p>Чтобы использовать этот шаблон, можно получить его с помощью JavaScript и клонировать:</p><p>&nbsp;</p><p><code>const template = document.getElementById(\'myTemplate\').content;\nconst clone = document.importNode(template, true);\ndocument.body.appendChild(clone);\n</code></p></li><li><p><strong>Элемент </strong><code><strong>&lt;slot&gt;</strong></code><strong>:</strong><br>Этот элемент используется внутри кастомных элементов для указания мест, куда может быть вставлено пользовательское содержимое. Это позволяет создать гибкие компоненты, которые могут принимать разные виды контента. Пример кастомного элемента с использованием слота:</p><p>&nbsp;</p><p><code>&lt;template id="myComponent"&gt;\n &nbsp; &nbsp;&lt;div&gt;\n &nbsp; &nbsp; &nbsp; &nbsp;&lt;h1&gt;&lt;slot name="header"&gt;&lt;/slot&gt;&lt;/h1&gt;\n &nbsp; &nbsp; &nbsp; &nbsp;&lt;p&gt;&lt;slot&gt;&lt;/slot&gt;&lt;/p&gt;\n &nbsp; &nbsp;&lt;/div&gt;\n&lt;/template&gt;\n\n&lt;my-component&gt;\n &nbsp; &nbsp;&lt;span slot="header"&gt;Заголовок&lt;/span&gt;\n &nbsp; &nbsp;Это содержимое будет вставлено в основной слот.\n&lt;/my-component&gt;\n</code></p><p>В этом примере содержимое с атрибутом <code>slot="header"</code> будет вставлено в заголовок, а остальное содержимое — в основной параграф.</p></li></ol><p>&nbsp;</p><p><strong>Применение:</strong><br>Использование <code>&lt;template&gt;</code> и <code>&lt;slot&gt;</code> позволяет разработчикам создавать мощные и переиспользуемые компоненты, которые могут быть динамически настроены в зависимости от контекста. Это делает разработку более эффективной и упрощает управление содержимым на страницах.</p><p>&nbsp;</p><p>Таким образом, эти инструменты помогают создать более чистый, организованный и эффективный код, что делает их важными для современных веб-приложений.</p>',
			shortAnswer:
				'<p><code>&lt;template&gt;</code> — это специальный элемент HTML, который позволяет создавать фрагменты кода, которые не отображаются на странице до тех пор, пока они не будут активированы с помощью JavaScript. Элемент <code>&lt;slot&gt;</code> используется в кастомных элементах для определения места, где можно вставить содержимое, переданное элементу. Эти элементы помогают разработчикам создавать более гибкие и переиспользуемые компоненты, которые могут динамически изменять свое содержимое в зависимости от контекста.</p>',
			status: 'public',
			rate: 2,
			complexity: 5,
			createdAt: '2024-10-11T17:29:24.847Z',
			updatedAt: '2024-10-11T17:29:24.847Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 82,
			title: 'Объясните концепцию "поднятия" (hoisting) в JavaScript.',
			description: 'Функции и переменные',
			code: null,
			imageSrc: null,
			keywords: ['function', 'поднятие', 'hoisting'],
			longAnswer:
				'<p>Hoisting (поднятие) в JavaScript означает, что объявления переменных и функций перемещаются в начало своей области видимости перед выполнением кода. Это позволяет использовать переменные и функции до их фактического объявления в коде.</p>',
			shortAnswer:
				'<p>Hoisting (поднятие) в JavaScript означает, что объявления переменных и функций перемещаются в начало своей области видимости перед выполнением кода. Это позволяет использовать переменные и функции до их фактического объявления в коде.</p>',
			status: 'public',
			rate: 3,
			complexity: 3,
			createdAt: '2024-10-06T07:05:18.745Z',
			updatedAt: '2024-10-06T07:05:18.745Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 83,
			title: 'Как узнать какого типа переменная? Что и в каком виде возвращает typeof?',
			description: 'Знание типов данных',
			code: null,
			imageSrc: null,
			keywords: ['типы данных', 'typeof'],
			longAnswer:
				'<p>Оператор&nbsp;typeof&nbsp;возвращает тип аргумента. Это полезно, когда мы хотим обрабатывать значения различных типов по-разному или просто хотим сделать проверку.</p>',
			shortAnswer:
				'<p>Оператор&nbsp;typeof&nbsp;возвращает тип аргумента. Это полезно, когда мы хотим обрабатывать значения различных типов по-разному или просто хотим сделать проверку.</p>',
			status: 'public',
			rate: 2,
			complexity: 3,
			createdAt: '2024-10-06T07:07:03.035Z',
			updatedAt: '2024-10-06T07:07:03.035Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 84,
			title: 'Для чего нужны функции?',
			description: 'Знание функций',
			code: null,
			imageSrc: null,
			keywords: ['функция'],
			longAnswer:
				'<p>Функции являются основным строительным блоком в программировании, включая JavaScript. Они позволяют организовывать код, делая его более структурированным, читаемым и многократно используемым</p>',
			shortAnswer:
				'<p>Функции являются основным строительным блоком в программировании, включая JavaScript. Они позволяют организовывать код, делая его более структурированным, читаемым и многократно используемым</p>',
			status: 'public',
			rate: 2,
			complexity: 2,
			createdAt: '2024-10-06T07:07:55.413Z',
			updatedAt: '2024-10-06T07:07:55.413Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 85,
			title: 'Расскажите про this и контекст',
			description: 'Изучаем this',
			code: null,
			imageSrc: null,
			keywords: ['this', 'контекст'],
			longAnswer:
				'<p>Концепция this в JavaScript может быть сложной для понимания, так как её значение зависит от контекста, в котором она используется.&nbsp;</p>',
			shortAnswer:
				'<p>Концепция this в JavaScript может быть сложной для понимания, так как её значение зависит от контекста, в котором она используется.&nbsp;</p>',
			status: 'public',
			rate: 4,
			complexity: 6,
			createdAt: '2024-10-06T07:10:27.109Z',
			updatedAt: '2024-10-06T07:10:27.109Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 86,
			title: 'Для чего нужен прототип?',
			description: 'Знание прототипов',
			code: null,
			imageSrc: null,
			keywords: ['proto', 'прототип'],
			longAnswer:
				'<p>Прототипы в JavaScript используются для реализации прототипного наследования, что позволяет объектам наследовать свойства и методы друг от друга.</p>',
			shortAnswer:
				'<p>Прототипы в JavaScript используются для реализации прототипного наследования, что позволяет объектам наследовать свойства и методы друг от друга.</p>',
			status: 'public',
			rate: 3,
			complexity: 7,
			createdAt: '2024-10-06T07:11:18.592Z',
			updatedAt: '2024-10-06T07:11:18.592Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 87,
			title: 'Что такое делегирование событий в JavaScript?',
			description: 'Знание DOM',
			code: null,
			imageSrc: null,
			keywords: ['dom', 'делегирование'],
			longAnswer:
				'<p>Прием, при котором мы назначаем один обработчик событий родителю, чтобы обрабатывать события всех его потомков.</p>',
			shortAnswer:
				'<p>Прием, при котором мы назначаем один обработчик событий родителю, чтобы обрабатывать события всех его потомков.</p>',
			status: 'public',
			rate: 3,
			complexity: 6,
			createdAt: '2024-10-06T07:12:34.157Z',
			updatedAt: '2024-10-06T07:12:34.157Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 129,
			title:
				'Как работает HTML Custom Elements API, и как можно создать и зарегистрировать собственные элементы?',
			description:
				'Этот вопрос проверяет знание API для создания пользовательских элементов в HTML. Он исследует, как разработчики могут создавать собственные теги и использовать их в приложениях.\n\n',
			code: null,
			imageSrc: null,
			keywords: ['custom elements'],
			longAnswer:
				'<p>HTML Custom Elements API — это часть спецификации Web Components, которая позволяет разработчикам создавать свои собственные HTML-элементы с кастомной логикой и поведением. Custom Elements позволяют определять новые типы элементов, которые могут быть переиспользуемы в любом месте приложения, улучшая структуру и модульность кода.</p><p>&nbsp;</p><p><strong>Создание кастомного элемента:</strong></p><p><br>Для создания кастомного элемента необходимо выполнить три шага:</p><p>&nbsp;</p><ol><li><p><strong>Создать класс, наследующий от </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>HTMLElement</strong></code><strong>:</strong></p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-javascript" style="border-radius: 12px; border: none; padding: 0; background: none;">class MyCustomElement extends HTMLElement {    \n\tconstructor() {        \n\tsuper();        \n\tthis.innerHTML = "&lt;p&gt;Это кастомный элемент&lt;/p&gt;";    \n\t} \n}</code></pre><p>&nbsp;</p></li><li><p><strong>Зарегистрировать элемент в браузере с помощью </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>customElements.define()</strong></code><strong>:</strong></p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-javascript" style="border-radius: 12px; border: none; padding: 0; background: none;">customElements.define(\'my-custom-element\', MyCustomElement);</code></pre><p>&nbsp;</p></li><li><p><strong>Использовать кастомный элемент на странице:</strong></p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-html" style="border-radius: 12px; border: none; padding: 0; background: none;">&lt;my-custom-element&gt;&lt;/my-custom-element&gt;</code></pre></li></ol><p>&nbsp;</p><p>После регистрации элемент <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">my-custom-element</code> можно использовать в любом месте HTML-страницы, как обычный тег.</p><p>&nbsp;</p><p><strong>Преимущества кастомных элементов:</strong></p><p>&nbsp;</p><ul><li><strong>Инкапсуляция логики:</strong><br>Логика поведения элемента полностью изолирована в классе, что делает код более организованным и модульным.</li><li><strong>Повторное использование:</strong><br>Создав кастомный элемент, его можно использовать многократно в разных частях приложения, что снижает дублирование кода.</li></ul><p><br>Custom Elements — это мощный инструмент для создания переиспользуемых компонентов в веб-приложениях. Они делают HTML более гибким, позволяя разработчикам определять новые элементы с уникальными функциями и поведением.</p>',
			shortAnswer:
				'<p>HTML Custom Elements API позволяет разработчикам создавать собственные HTML-элементы, которые ведут себя как стандартные элементы, но могут иметь свою уникальную логику и стиль. Чтобы создать кастомный элемент, необходимо определить класс, который наследует от <code>HTMLElement</code>, и зарегистрировать его с помощью <code>customElements.define()</code>. Эти элементы могут быть использованы на странице так же, как и стандартные HTML-теги. Custom Elements расширяют возможности HTML, делая его более гибким для современных веб-приложений.</p>',
			status: 'public',
			rate: 2,
			complexity: 6,
			createdAt: '2024-10-11T17:51:13.918Z',
			updatedAt: '2024-10-28T18:00:49.752Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
			updatedBy: {
				id: 'bc475b16-8d73-4dd1-9cb9-5214feca6eae',
				username: 'daryakrutova',
			},
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
			id: 130,
			title:
				'Как управлять фокусом на странице с помощью атрибутов tabindex и методов, таких как focus()?',
			description:
				'Этот вопрос проверяет знание механизмов управления фокусом в веб-страницах. Он важен для обеспечения доступности (a11y) и лучшего пользовательского опыта.',
			code: null,
			imageSrc: null,
			keywords: ['tabindex', 'focus', 'сео'],
			longAnswer:
				'<p>Фокус на веб-странице — это механизм, который определяет, какой элемент активен и готов для взаимодействия с пользователем. Это важно для навигации по странице с клавиатуры и для обеспечения доступности веб-контента для людей с ограниченными возможностями.</p><p>&nbsp;</p><p><strong>Атрибут </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>tabindex</strong></code><strong>:</strong></p><p><br>Атрибут <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex</code> управляет тем, в каком порядке элементы на странице будут получать фокус при использовании клавиши <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">Tab</code>. Значения <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex</code> могут быть:</p><p>&nbsp;</p><ul><li><strong>Положительные значения:</strong> Элементы с положительным <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex</code> получают фокус первыми, в порядке возрастания значения. Например, элемент с <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex="1"</code> получит фокус перед элементом с <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex="2"</code>.</li><li><strong>Значение </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>0</strong></code><strong>:</strong> Элементы с <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex="0"</code> участвуют в стандартной навигации по фокусу, но не имеют приоритета.</li><li><strong>Отрицательные значения:</strong> Элементы с отрицательным <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex</code>, такие как <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex="-1"</code>, не могут быть сфокусированы с клавиатуры, но на них можно установить фокус программно с помощью JavaScript.</li></ul><p>&nbsp;</p><p><strong>Пример использования </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>tabindex</strong></code><strong>:</strong></p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-html" style="border-radius: 12px; border: none; padding: 0; background: none;">&lt;button tabindex="1"&gt;Кнопка 1&lt;/button&gt; \n&lt;button tabindex="3"&gt;Кнопка 3&lt;/button&gt; \n&lt;button tabindex="2"&gt;Кнопка 2&lt;/button&gt;</code></pre><p>&nbsp;</p><p>В этом примере порядок фокуса будет: Кнопка 1, Кнопка 2, Кнопка 3, так как <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex</code> определяет последовательность.</p><p>&nbsp;</p><p><strong>Метод </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>focus()</strong></code><strong>:</strong><br>В JavaScript метод <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">focus()</code> позволяет программно установить фокус на элементе. Это полезно для управления фокусом при изменении интерфейса или при необходимости обратить внимание пользователя на определенный элемент:</p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-javascript" style="border-radius: 12px; border: none; padding: 0; background: none;">document.getElementById(\'myButton\').focus();</code></pre><p>&nbsp;</p><p><strong>Пример использования </strong><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><strong>focus()</strong></code><strong> для улучшения доступности:</strong> Когда пользователь закрывает модальное окно, можно вернуть фокус на элемент, с которого оно было открыто:</p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-javascript" style="border-radius: 12px; border: none; padding: 0; background: none;">button.addEventListener(\'click\', function() {\n    modal.close();    \nbutton.focus(); // Возвращаем фокус на кнопку после закрытия \n});</code></pre><p><br>Управление фокусом с помощью <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">tabindex</code> и методов, таких как <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">focus()</code>, важно для обеспечения доступности и улучшения пользовательского опыта. Это особенно критично для пользователей, которые полагаются на клавиатуру для навигации по страницам, таких как люди с ограниченными возможностями.</p>',
			shortAnswer:
				'<p>Атрибут <code>tabindex</code> управляет порядком, в котором элементы на странице получают фокус при навигации с клавиатуры. Элементы с положительным значением <code>tabindex</code> получают фокус в порядке возрастания числа, элементы с <code>tabindex="0"</code> — в порядке их появления, а отрицательные значения делают элемент недоступным для фокусировки с клавиатуры. Метод <code>focus()</code> в JavaScript позволяет программно устанавливать фокус на элементе. Это важно для обеспечения доступности и удобства управления для пользователей с особыми потребностями.</p>',
			status: 'public',
			rate: 1,
			complexity: 3,
			createdAt: '2024-10-11T17:53:14.473Z',
			updatedAt: '2024-10-28T18:03:03.762Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
			updatedBy: {
				id: 'bc475b16-8d73-4dd1-9cb9-5214feca6eae',
				username: 'daryakrutova',
			},
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
			id: 131,
			title:
				'Как работают fallback-механизмы в HTML5 для старых браузеров и какие техники следует применять для кроссбраузерной совместимости?',
			description:
				'Этот вопрос проверяет знание механизмов обеспечения работы веб-страниц в старых браузерах, которые не поддерживают современные возможности HTML5, а также проверяет понимание кроссбраузерной совместимости.',
			code: null,
			imageSrc: null,
			keywords: ['fallback', 'полифилы', 'шимы', 'video'],
			longAnswer:
				'<p>Fallback-механизмы и кроссбраузерная совместимость — это важные аспекты разработки, которые обеспечивают доступность функционала веб-страниц в разных браузерах, включая старые версии.</p><p>&nbsp;</p><p><strong>Пример fallback для </strong><code><strong>&lt;video&gt;</strong></code><strong>:</strong></p><p>&nbsp;</p><p><code>&lt;video controls&gt;\n &nbsp;&lt;source src="video.mp4" type="video/mp4"&gt;\n &nbsp;&lt;source src="video.ogv" type="video/ogg"&gt;\n &nbsp;Your browser does not support the video tag. \n &nbsp;&lt;a href="video.mp4"&gt;Download the video&lt;/a&gt;\n&lt;/video&gt;\n</code></p><p>&nbsp;</p><p>В данном примере, если браузер не поддерживает <code>&lt;video&gt;</code>, пользователь увидит текст и ссылку на скачивание видео.</p><p>&nbsp;</p><p><strong>Fallback для CSS:</strong><br>Если CSS-свойство не поддерживается, можно использовать устаревшие или альтернативные стили:</p><p>&nbsp;</p><p><code>.example {\n &nbsp;background: rgb(255, 0, 0); /* старый синтаксис */\n &nbsp;background: linear-gradient(red, yellow); /* новый синтаксис */\n}\n</code></p><p>&nbsp;</p><p><strong>Кроссбраузерная совместимость:</strong><br>Для достижения совместимости часто применяют:</p><p>&nbsp;</p><ul><li><strong>Полифилы:</strong> Это скрипты, которые добавляют поддержку современных функций в старые браузеры. Например, полифил для <code>fetch()</code> или <code>Promise</code>.</li><li><strong>Шимы:</strong> Похожи на полифилы, но заменяют недоступные функции альтернативными.</li></ul><p>&nbsp;</p><p><strong>Пример полифила для </strong><code><strong>fetch()</strong></code><strong>:</strong> Если браузер не поддерживает <code>fetch()</code>, можно использовать полифил:</p><p>&nbsp;</p><p><code>&lt;script src="https://cdnjs.cloudflare.com/ajax/libs/fetch/2.0.4/fetch.min.js"&gt;&lt;/script&gt;\n</code></p><p>&nbsp;</p><p><strong>Техники кроссбраузерной совместимости:</strong></p><p>&nbsp;</p><ol><li><strong>Progressive Enhancement (прогрессивное улучшение):</strong> Базовая функциональность для всех, улучшенная функциональность для новых браузеров.</li><li><strong>Graceful Degradation (плавное ухудшение):</strong> Сначала разрабатываются функции для современных браузеров, а затем добавляются fallback-механизмы для старых.</li><li><strong>Использование feature detection (определение поддерживаемых функций):</strong> Вместо проверки версии браузера проверяются конкретные возможности:</li></ol><p>&nbsp;</p><p><code>if (\'querySelector\' in document) {\n &nbsp; &nbsp;// код для современных браузеров\n}\n</code></p><p><br>Использование fallback-механизмов и полифилов важно для обеспечения работоспособности веб-страниц на устройствах с разной поддержкой современных стандартов. Это помогает сделать сайт доступным для большего числа пользователей.</p>',
			shortAnswer:
				'<p>HTML5 предлагает новые теги и функции, которые не всегда поддерживаются старыми браузерами. Чтобы страницы корректно работали в таких браузерах, используются fallback-механизмы — альтернативный контент или теги, которые подхватываются, если основной функционал недоступен. Например, для видео можно использовать элемент <code>&lt;object&gt;</code> или ссылку для скачивания файла, если <code>&lt;video&gt;</code> не поддерживается. Для кроссбраузерной совместимости также применяются полифилы и шимы — скрипты, добавляющие поддержку современных функций в старых браузерах.</p>',
			status: 'public',
			rate: 1,
			complexity: 6,
			createdAt: '2024-10-11T18:04:00.141Z',
			updatedAt: '2024-10-11T18:04:00.141Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 134,
			title:
				'Как реализовать ленивую загрузку (lazy loading) элементов на странице с помощью атрибута loading? Какие есть альтернативные методы?',
			description:
				'Этот вопрос проверяет знание ленивой загрузки, которая оптимизирует производительность страниц, загружая элементы, только когда они становятся видимыми. Важно знать современные методы и альтернативы.',
			code: null,
			imageSrc: null,
			keywords: ['loading', 'lazy', 'intersection', 'img', 'optimisation'],
			longAnswer:
				'<p>Ленивая загрузка (lazy loading) — это метод оптимизации производительности, который позволяет загружать ресурсы только тогда, когда они нужны пользователю, то есть когда они попадают в видимую область экрана (viewport). Это полезно для страниц с большим количеством изображений или видео, где загрузка всех ресурсов сразу может замедлить начальную загрузку страницы.</p><p>&nbsp;</p><p><strong>Атрибут </strong><code><strong>loading</strong></code><strong>:</strong><br>HTML5 добавил нативную поддержку ленивой загрузки для элементов <code>&lt;img&gt;</code> и <code>&lt;iframe&gt;</code> с помощью атрибута <code>loading</code>.</p><p>&nbsp;</p><p><code>&lt;img src="image.jpg" alt="Lazy loaded image" loading="lazy"&gt;\n</code></p><p>&nbsp;</p><p>При использовании этого атрибута браузер автоматически загружает изображение только тогда, когда оно будет находиться в видимой области экрана.</p><p>&nbsp;</p><p><strong>Преимущества </strong><code><strong>loading="lazy"</strong></code><strong>:</strong></p><ol><li><strong>Простота использования:</strong> Добавление атрибута требует минимальных изменений в коде.</li><li><strong>Улучшенная производительность:</strong> Ускоряет рендеринг страницы, так как уменьшает количество загружаемых ресурсов.</li><li><strong>Поддержка браузерами:</strong> Современные браузеры поддерживают этот атрибут, что делает его доступным для использования без сторонних библиотек.</li></ol><p>&nbsp;</p><p><strong>Альтернативные методы:</strong></p><ul><li><strong>Intersection Observer API:</strong> Этот API предоставляет больше контроля над тем, когда элементы должны загружаться. Он отслеживает, когда элемент попадает в видимую область, и запускает загрузку ресурса.</li></ul><p>&nbsp;</p><p><code>const img = document.querySelector(\'img\');\nconst observer = new IntersectionObserver((entries, observer) =&gt; {\n &nbsp;entries.forEach(entry =&gt; {\n &nbsp; &nbsp;if (entry.isIntersecting) {\n &nbsp; &nbsp; &nbsp;entry.target.src = entry.target.dataset.src;\n &nbsp; &nbsp; &nbsp;observer.unobserve(entry.target);\n &nbsp; &nbsp;}\n &nbsp;});\n});\nobserver.observe(img);\n</code></p><ul><li><strong>Отложенная загрузка с помощью JavaScript:</strong> Можно вручную отложить загрузку, меняя значение атрибута <code>src</code> у изображений или элементов <code>&lt;iframe&gt;</code> только когда они становятся видимыми.</li></ul><p><br>Ленивая загрузка помогает сократить время загрузки страницы и экономить трафик пользователя. Хотя атрибут <code>loading="lazy"</code> — это удобное и простое решение, более сложные сценарии можно реализовать с помощью Intersection Observer для тонкой настройки процесса загрузки.&nbsp;</p>',
			shortAnswer:
				'<p>Ленивая загрузка — это техника, которая позволяет откладывать загрузку изображений или фреймов до тех пор, пока они не появятся в видимой области экрана. Атрибут <code>loading="lazy"</code> в теге <code>&lt;img&gt;</code> или <code>&lt;iframe&gt;</code> автоматически откладывает загрузку элемента. Это сокращает время начальной загрузки страницы и снижает использование трафика. Альтернативные методы включают использование Intersection Observer API для более гибкого контроля над загрузкой элементов.</p>',
			status: 'public',
			rate: 4,
			complexity: 7,
			createdAt: '2024-10-11T18:44:05.659Z',
			updatedAt: '2024-10-11T18:44:05.659Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 136,
			title:
				'Что такое HTML Imports и почему они были отклонены стандартом? Какие современные альтернативы существуют для организации модулей?',
			description:
				'Этот вопрос проверяет знание устаревших технологий для импорта HTML, а также современных методов модульной организации кода. Это важно для понимания, как эволюционировали подходы к модульности в веб-разработке.\n\n',
			code: null,
			imageSrc: null,
			keywords: ['imports', 'es-модули'],
			longAnswer:
				'<p>HTML Imports был предложен как способ модульного подключения HTML-кода в другие документы. С помощью тега <code>&lt;link&gt;</code> можно было загружать внешний HTML-файл и включать его содержимое на страницу:</p><p>&nbsp;</p><p><code>&lt;link rel="import" href="header.html"&gt;\n</code></p><p>&nbsp;</p><p>Однако, эта технология не получила широкого признания и была отклонена из-за ряда причин:</p><p>&nbsp;</p><ol><li><strong>Ограниченная поддержка браузерами:</strong> HTML Imports поддерживался только в некоторых браузерах, таких как Chrome, что делало его непригодным для кроссбраузерных проектов.</li><li><strong>Сложности с производительностью:</strong> Импорт HTML-файлов мог приводить к увеличению времени загрузки и сложности управления зависимостями.</li><li><strong>Лучшие альтернативы:</strong> Стандарт ECMAScript (ES6) предложил более универсальные модули на основе JavaScript, которые лучше справляются с задачей разделения и повторного использования кода.</li></ol><p>&nbsp;</p><p><strong>Современные альтернативы:</strong></p><p>&nbsp;</p><ul><li><p><strong>ES-модули (JavaScript):</strong> Это стандартизированный способ организации и загрузки кода. С помощью директивы <code>import/export</code> можно разделять код на модули, которые легко подключать друг к другу.</p><p>&nbsp;</p><p><code>// module.js\nexport const myFunction = () =&gt; { console.log("Hello, World!"); };\n\n// main.js\nimport { myFunction } from \'./module.js\';\nmyFunction();\n</code></p></li><li><p><strong>Web Components:</strong> Компоненты на основе стандарта Web Components позволяют создавать кастомные элементы, содержащие HTML, CSS и JavaScript, что делает их отличной альтернативой для создания модульного интерфейса.</p><p>&nbsp;</p><p><code>class MyComponent extends HTMLElement {\n &nbsp;connectedCallback() {\n &nbsp; &nbsp;this.innerHTML = `&lt;p&gt;Custom component content&lt;/p&gt;`;\n &nbsp;}\n}\ncustomElements.define(\'my-component\', MyComponent);\n</code></p></li></ul><p>&nbsp;</p><p>Таким образом, HTML Imports не получил поддержку в силу появления более совершенных стандартов, таких как ES-модули и Web Components, которые обеспечивают гибкость и мощь для создания модульных приложений.</p>',
			shortAnswer:
				'<p>HTML Imports — это экспериментальная технология, которая позволяла загружать и включать HTML-файлы в другие документы с помощью тега <code>&lt;link&gt;</code>. Она была отклонена из-за слабой поддержки и наличия альтернативных стандартов, таких как JavaScript модули и Web Components. Современные альтернативы включают ES-модули (import/export) и технологии, основанные на шаблонах и компонентах, такие как React и Web Components.</p>',
			status: 'public',
			rate: 1,
			complexity: 5,
			createdAt: '2024-10-11T18:48:03.030Z',
			updatedAt: '2024-10-11T18:48:03.030Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 137,
			title:
				'Какие существуют методы оптимизации производительности рендеринга HTML, такие как минимизация перерисовок и рефлоу?',
			description:
				'Этот вопрос проверяет знание механизмов, влияющих на производительность рендеринга страницы, и методов минимизации затратных операций, таких как рефлоу и перерисовки. Это ключевой аспект для создания быстрого и отзывчивого интерфейса.',
			code: null,
			imageSrc: null,
			keywords: ['requestanimationframe', 'optimisation', 'рефлоу', 'dom', 'render'],
			longAnswer:
				"<p>Процесс рендеринга HTML включает несколько этапов: построение DOM-дерева, рендер-дерева, вычисление стилей и их применение, а также процессы <strong>рефлоу</strong> и <strong>перерисовки</strong>.</p><p>&nbsp;</p><ul><li><strong>Рефлоу (Reflow):</strong> Это процесс, при котором браузер пересчитывает положение и размер всех элементов на странице при изменении DOM или CSS. Это одна из самых затратных операций.</li><li><strong>Перерисовка (Repaint):</strong> Это процесс обновления видимой части страницы без изменения её структуры (например, изменение цвета фона).</li></ul><p>&nbsp;</p><p>Частые рефлоу и перерисовки могут значительно замедлить работу страницы, особенно на мобильных устройствах с низкой производительностью.</p><p>&nbsp;</p><p><strong>Методы оптимизации:</strong></p><p>&nbsp;</p><ol><li><p><strong>Минимизация изменений в DOM:</strong> Изменение большого числа элементов в DOM по отдельности вызывает рефлоу и перерисовку для каждого изменения. Лучше сгруппировать изменения или использовать фрагменты DOM для вставки нескольких элементов одновременно.</p><p>&nbsp;</p><p><code>const fragment = document.createDocumentFragment();\nfor (let i = 0; i &lt; 100; i++) {\n &nbsp;const div = document.createElement('div');\n &nbsp;fragment.appendChild(div);\n}\ndocument.body.appendChild(fragment);\n</code></p></li><li><p><strong>Использование CSS-трансформаций:</strong> Изменения через <code>transform</code> и <code>opacity</code> обычно не вызывают рефлоу, поскольку они не требуют пересчета положения элементов.</p><p>&nbsp;</p><p><code>.animate {\n &nbsp;transform: translateX(100px); /* Быстрая анимация без рефлоу */\n}\n</code></p></li><li><p><strong>Буферизация изменений с помощью </strong><code><strong>requestAnimationFrame</strong></code><strong>:</strong> Это позволяет браузеру выполнять обновления перед следующей перерисовкой экрана, предотвращая частые перерисовки.</p><p>&nbsp;</p><p><code>let element = document.getElementById('myElement');\nrequestAnimationFrame(() =&gt; {\n &nbsp;element.style.left = '100px';\n});\n</code></p></li><li><strong>Избегание чтения свойств, вызывающих рефлоу:</strong> Такие свойства, как <code>offsetHeight</code> или <code>clientWidth</code>, вызывают рефлоу, так как браузеру нужно пересчитать их значения. Вместо этого старайтесь кешировать результаты или использовать такие свойства реже.</li></ol><p>&nbsp;</p><p>Таким образом, минимизация рефлоу и перерисовок может значительно повысить производительность страницы, особенно при работе с динамическим контентом и анимациями.</p>",
			shortAnswer:
				'<p>Оптимизация рендеринга включает минимизацию операций рефлоу (перестройка структуры документа) и перерисовки (обновление визуальных изменений). Это достигается за счёт уменьшения частоты изменений DOM, использования буферизации изменений через <code>requestAnimationFrame</code> и CSS-трансформаций, которые не вызывают рефлоу. Также важно уменьшать количество тяжёлых операций, таких как изменение размера и положения элементов.</p>',
			status: 'public',
			rate: 3,
			complexity: 7,
			createdAt: '2024-10-11T18:49:47.890Z',
			updatedAt: '2024-10-11T18:49:47.890Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 138,
			title:
				'Как реализовать многоязычную поддержку (i18n) в HTML? Какие атрибуты и техники используются для этого?',
			description:
				'Этот вопрос проверяет знание атрибутов и техник для поддержки многоязычности на веб-страницах, что важно для создания приложений, доступных на разных языках.',
			code: null,
			imageSrc: null,
			keywords: ['lang', 'i18n', 'многоязычный', 'интернационализация'],
			longAnswer:
				'<p>Многоязычная поддержка (или интернационализация, i18n) позволяет отображать содержимое веб-страницы на нескольких языках, чтобы сделать сайт доступным для пользователей из разных стран. Основные техники включают использование атрибутов HTML и сторонних инструментов для динамической смены языка.</p><p>&nbsp;</p><ol><li><p><strong>Атрибут </strong><code><strong>lang</strong></code><strong>:</strong> Этот атрибут используется для указания языка содержимого элемента или всей страницы. Он помогает поисковым системам, а также экранным читалкам правильно интерпретировать содержимое.</p><p>&nbsp;</p><p><code>&lt;html lang="en"&gt;\n &nbsp;&lt;body&gt;\n &nbsp; &nbsp;&lt;p lang="fr"&gt;Bonjour!&lt;/p&gt; &lt;!-- Этот абзац на французском --&gt;\n &nbsp;&lt;/body&gt;\n&lt;/html&gt;\n</code></p></li><li><p><strong>Атрибут </strong><code><strong>dir</strong></code><strong>:</strong> Устанавливает направление текста. Например, для арабского или иврита используется <code>dir="rtl"</code> (right-to-left), что меняет направление текста на странице.</p><p>&nbsp;</p><p><code>&lt;p dir="rtl"&gt;هذا نص عربي&lt;/p&gt; &lt;!-- Текст на арабском --&gt;\n</code></p></li><li><p><strong>Локализация с использованием JavaScript:</strong> Для динамической смены языка в зависимости от выбора пользователя или настроек браузера можно использовать библиотеки вроде i18next. Эти библиотеки позволяют хранить переводы в JSON-файлах и подставлять соответствующие значения на страницу.</p><p>&nbsp;</p><p><code>import i18next from \'i18next\';\n\ni18next.init({\n &nbsp;resources: {\n &nbsp; &nbsp;en: { translation: { "welcome": "Welcome" } },\n &nbsp; &nbsp;fr: { translation: { "welcome": "Bienvenue" } }\n &nbsp;},\n &nbsp;lng: "en", // Язык по умолчанию\n});\n\ndocument.getElementById(\'welcome\').innerText = i18next.t(\'welcome\');\n</code></p></li></ol><p>&nbsp;</p><p>Для более сложных приложений часто применяется динамическая локализация, где на основе пользовательских настроек язык и направления текста могут меняться в реальном времени.</p>',
			shortAnswer:
				'<p>Для многоязычной поддержки в HTML используются атрибуты <code>lang</code> и <code>dir</code>. Атрибут <code>lang</code> указывает язык содержимого (например, <code>lang="en"</code> для английского), а <code>dir</code> — направление текста (например, <code>dir="rtl"</code> для языков, которые читаются справа налево). Для управления динамической локализацией часто используют JavaScript и библиотеки вроде i18next, позволяющие менять язык интерфейса в зависимости от предпочтений пользователя.</p><p>&nbsp;</p>',
			status: 'public',
			rate: 3,
			complexity: 6,
			createdAt: '2024-10-11T18:52:15.029Z',
			updatedAt: '2024-10-11T18:52:15.029Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
					id: 2,
					title: 'JavaScript',
					description:
						'JavaScript - популярный язык программирования, в основном используемый для создания динамических и интерактивных веб-страниц. Он необходим для разработки интерфейсов веб-приложений.',
					imageSrc: null,
					createdAt: '2024-06-04T13:40:16.610Z',
					updatedAt: '2024-11-01T21:33:13.635Z',
				},
				{
					id: 27,
					title: 'HTML',
					description:
						'Разметка веб-страниц с использованием семантических тегов для улучшения SEO и доступности.',
					imageSrc: null,
					createdAt: '2024-10-06T06:32:23.656Z',
					updatedAt: '2024-10-06T06:32:23.656Z',
				},
			],
			checksCount: 0,
			isLearned: false,
		},
		{
			id: 139,
			title:
				'Как использовать элемент <canvas> для рисования графики на стороне клиента? В каких сценариях это применимо?',
			description:
				'Этот вопрос проверяет знание элемента <canvas> и его использования для создания динамических графических интерфейсов на клиентской стороне. Это важно для создания интерактивных приложений с графикой.',
			code: null,
			imageSrc: null,
			keywords: ['canvas', 'графика'],
			longAnswer:
				'<p>Элемент <code>&lt;canvas&gt;</code> — это HTML5-элемент, который предоставляет место для рисования с использованием JavaScript. В отличие от других HTML-элементов, <code>&lt;canvas&gt;</code> не отображает содержимое напрямую, а представляет собой контейнер, в котором с помощью скриптов можно рисовать графику. Для работы с ним используется API <code>CanvasRenderingContext2D</code>, которое предоставляет методы для рисования фигур, линий, текста и изображений.</p><p>&nbsp;</p><p>Пример простого использования <code>&lt;canvas&gt;</code>:</p><p>&nbsp;</p><p><code>&lt;canvas id="myCanvas" width="200" height="200"&gt;&lt;/canvas&gt;\n&lt;script&gt;\n &nbsp;const canvas = document.getElementById(\'myCanvas\');\n &nbsp;const ctx = canvas.getContext(\'2d\');\n\n &nbsp;// Рисуем прямоугольник\n &nbsp;ctx.fillStyle = \'green\';\n &nbsp;ctx.fillRect(10, 10, 150, 100);\n&lt;/script&gt;\n</code></p><p>&nbsp;</p><p>С помощью методов контекста можно рисовать как простые формы, так и более сложные элементы:</p><p>&nbsp;</p><ul><li><strong>Прямоугольники:</strong> <code>fillRect(x, y, width, height)</code> рисует заполненный прямоугольник.</li><li><strong>Линии и кривые:</strong> Для создания пути используется <code>beginPath()</code>, после чего можно добавлять линии через <code>moveTo()</code> и <code>lineTo()</code>.</li></ul><p>&nbsp;</p><p>Пример рисования круга:</p><p>&nbsp;</p><p><code>ctx.beginPath();\nctx.arc(100, 100, 50, 0, Math.PI * 2);\nctx.stroke();\n</code></p><p>&nbsp;</p><p><strong>Сценарии использования:</strong></p><p>&nbsp;</p><ol><li><strong>Игры и анимации:</strong> <code>&lt;canvas&gt;</code> часто используется для создания игр, так как позволяет быстро обновлять графику и поддерживает динамическое взаимодействие.</li><li><strong>Визуализация данных:</strong> Его также применяют для создания графиков и диаграмм.</li><li><strong>Редактирование изображений:</strong> С помощью <code>&lt;canvas&gt;</code> можно манипулировать изображениями (например, обрезка, фильтры и т.д.).</li></ol><p>&nbsp;</p><p>Элемент <code>&lt;canvas&gt;</code> мощный инструмент для создания интерактивной графики в браузере, предоставляя широкий набор методов для работы с 2D-контентом.</p>',
			shortAnswer:
				'<p>Элемент <code>&lt;canvas&gt;</code> используется для рисования графики с помощью JavaScript на веб-странице. С его помощью можно создавать как простые фигуры, так и сложные анимации и игры. Он не имеет встроенного содержания, и все графические элементы рисуются динамически через методы, такие как <code>fillRect()</code> для рисования прямоугольников и <code>beginPath()</code> для создания линий и кривых.</p>',
			status: 'public',
			rate: 1,
			complexity: 5,
			createdAt: '2024-10-11T18:53:45.710Z',
			updatedAt: '2024-10-11T18:53:45.710Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 140,
			title:
				'Что такое HTML5 History API и как его использовать для управления навигацией без перезагрузки страницы?',
			description:
				'Этот вопрос проверяет знание HTML5 History API и его роли в управлении историей браузера без перезагрузки страницы. Это важно для создания динамических одностраничных приложений (SPA).',
			code: null,
			imageSrc: null,
			keywords: ['history', 'window', 'url', 'spa'],
			longAnswer:
				'<p>HTML5 History API — это набор методов для управления историей навигации в браузере без перезагрузки страницы. В традиционных веб-приложениях каждый переход по ссылке ведет к загрузке новой страницы. С помощью History API можно динамически изменять содержимое и URL страницы без ее полной перезагрузки, что делает взаимодействие более плавным, особенно в одностраничных приложениях (SPA).</p><p>&nbsp;</p><p>Основные методы History API:</p><p>&nbsp;</p><ol><li><p><code><strong>history.pushState(state, title, url)</strong></code><strong>:</strong> Добавляет новый элемент в историю браузера с обновленным URL. Этот метод не перезагружает страницу, но позволяет изменять адресную строку.</p><p>&nbsp;</p><p><code>history.pushState({page: 1}, "Title", "/new-url");\n</code></p></li><li><p><code><strong>history.replaceState(state, title, url)</strong></code><strong>:</strong> Заменяет текущий элемент истории без добавления нового, что полезно, когда нужно изменить URL, но не сохранять новый шаг в истории.</p><p>&nbsp;</p><p><code>history.replaceState({page: 2}, "Title", "/another-url");\n</code></p></li><li><p><code><strong>window.onpopstate</strong></code><strong>:</strong> Это событие срабатывает при переходе назад или вперед в истории. Его можно использовать для обновления содержимого страницы при таких переходах.</p><p>&nbsp;</p><p><code>window.onpopstate = function(event) {\n &nbsp;console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));\n};\n</code></p></li></ol><p>&nbsp;</p><p>History API активно используется в современных фреймворках, таких как React и Vue, чтобы управлять маршрутизацией в SPA. Это позволяет сделать навигацию более интерактивной и ускорить отклик приложения.</p>',
			shortAnswer:
				'<p>HTML5 History API позволяет изменять URL в браузере без перезагрузки страницы, сохраняя историю переходов. Основные методы API — <code>pushState()</code>, <code>replaceState()</code> и событие <code>popstate</code>. Они позволяют динамически менять состояние страницы, обновляя URL, что делает навигацию в одностраничных приложениях (SPA) более плавной и интерактивной.</p>',
			status: 'public',
			rate: 2,
			complexity: 8,
			createdAt: '2024-10-11T18:56:37.564Z',
			updatedAt: '2024-10-11T18:56:37.564Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 144,
			title:
				'Как реализовать поддержку темной темы (dark mode) с помощью HTML и CSS? Какие метатеги и медиавыражения используются?',
			description:
				'Этот вопрос проверяет знания о реализации темной темы с использованием CSS и медиавыражений, а также понимание роли метатегов для настройки внешнего вида страницы в зависимости от предпочтений пользователя.',
			code: null,
			imageSrc: null,
			keywords: ['темы', 'media'],
			longAnswer:
				'<p>Поддержка темной темы в веб-приложениях позволяет пользователям автоматически переключаться между светлой и темной темой на основе их системных настроек. Это достигается с помощью CSS-медиавыражения <code>prefers-color-scheme</code>. Это медиавыражение проверяет, какую цветовую схему предпочитает пользовательская система (светлую или темную), и применяет соответствующие стили.</p><p>&nbsp;</p><p><strong>Пример использования медиавыражения для темной темы:</strong></p><p>&nbsp;</p><p><code>/* Стиль по умолчанию (светлая тема) */\nbody {\n &nbsp;background-color: white;\n &nbsp;color: black;\n}\n\n/* Темная тема */\n@media (prefers-color-scheme: dark) {\n &nbsp;body {\n &nbsp; &nbsp;background-color: black;\n &nbsp; &nbsp;color: white;\n &nbsp;}\n}\n</code></p><p>&nbsp;</p><p>Это позволяет автоматически применять темную тему, если устройство пользователя настроено на темную цветовую схему.</p><p>&nbsp;</p><p>Для мануального переключения между темами с помощью кнопки можно использовать JavaScript. Например, можно хранить состояние темы в <code>localStorage</code> и динамически менять классы в DOM.</p><p>&nbsp;</p><p><strong>Пример с JavaScript для ручного переключения темы:</strong></p><p>&nbsp;</p><p><code>const toggleTheme = () =&gt; {\n &nbsp;const theme = document.body.classList.toggle(\'dark\') ? \'dark\' : \'light\';\n &nbsp;localStorage.setItem(\'theme\', theme);\n};\n\ndocument.addEventListener(\'DOMContentLoaded\', () =&gt; {\n &nbsp;const savedTheme = localStorage.getItem(\'theme\');\n &nbsp;if (savedTheme) {\n &nbsp; &nbsp;document.body.classList.add(savedTheme);\n &nbsp;}\n});\n</code></p><p>&nbsp;</p><p>С помощью этого кода можно сохранить выбор пользователя и применить его при следующем посещении страницы.</p><p>&nbsp;</p><p>Также можно использовать метатеги, такие как <code>theme-color</code>, для изменения цветовой схемы браузера:</p><p>&nbsp;</p><p><code>&lt;meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)"&gt;\n&lt;meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)"&gt;\n</code></p><p>&nbsp;</p><p>Эти метатеги настраивают цветовую схему интерфейса браузера в зависимости от темы. Поддержка темной темы делает веб-приложения более адаптивными и улучшает пользовательский опыт.</p><p>&nbsp;</p><p>&nbsp;</p>',
			shortAnswer:
				'<p>Темную тему можно реализовать с помощью CSS-медиавыражения <code>prefers-color-scheme</code>, которое определяет предпочтения пользователя относительно цветовой схемы (светлой или темной). В зависимости от предпочтений браузера применяются соответствующие стили. Также можно настроить переключение темы вручную с помощью JavaScript и CSS-классов.</p>',
			status: 'public',
			rate: 1,
			complexity: 4,
			createdAt: '2024-10-11T19:05:23.266Z',
			updatedAt: '2024-10-11T19:05:23.266Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
					id: 28,
					title: 'CSS',
					description:
						'Стилейзация интерфейсов, включая адаптивную верстку и оптимизацию для различных устройств с использованием Flexbox и Grid.',
					imageSrc: null,
					createdAt: '2024-10-06T06:32:44.139Z',
					updatedAt: '2024-10-06T06:32:44.139Z',
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
			id: 153,
			title: 'Способы создания (объявления) переменной в JavaScript?',
			description:
				'Этот вопрос проверяет понимание того, как объявляются переменные в JavaScript и в чем разница между методами объявления.',
			code: null,
			imageSrc: null,
			keywords: ['var', 'let', 'const'],
			longAnswer:
				'<p>В JavaScript есть три способа объявить переменную: <code>var</code>, <code>let</code> и <code>const</code>.</p><p>&nbsp;</p><ol><li><code>var</code> — это старый способ объявления, который имеет функциональную область видимости и поддерживает поднятие (hoisting). Это значит, что переменные, объявленные с <code>var</code>, могут быть использованы до их фактического объявления, что иногда приводит к неожиданным результатам.</li><li><code>let</code> был введен в ES6 и заменяет <code>var</code> в большинстве случаев. Он имеет блочную область видимости, то есть переменная доступна только внутри блока <code>{}</code>, в котором она объявлена. Это делает код более предсказуемым.</li><li><code>const</code> также появился в ES6 и используется для объявления констант, значения которых нельзя переназначить после инициализации. Однако это не значит, что объект, объявленный с <code>const</code>, не может изменяться — нельзя изменить только саму ссылку на объект.</li></ol>',
			shortAnswer:
				'<p>В JavaScript переменные можно объявлять с помощью <code>var</code>, <code>let</code> и <code>const</code>. <code>var</code> — это устаревший способ, у него есть особенности, такие как поднятие и функциональная область видимости. <code>let</code> и <code>const</code> появились в ES6 и имеют блочную область видимости. <code>const</code> используется для переменных, которые нельзя переназначить.</p>',
			status: 'public',
			rate: 2,
			complexity: 1,
			createdAt: '2024-10-12T16:50:52.478Z',
			updatedAt: '2024-10-12T16:50:52.478Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 154,
			title: 'Объяснить разницу между var, let и const в JavaScript?',
			description:
				'Вопрос проверяет знание ключевых отличий между способами объявления переменных и их поведение в разных ситуациях.',
			code: null,
			imageSrc: null,
			keywords: ['переменные', 'область видимости', 'var', 'let', 'const'],
			longAnswer:
				'<ol><li><code>var</code> — переменные, объявленные через <code>var</code>, имеют область видимости на уровне функции. Это значит, что они видны во всей функции, даже если объявлены в блоках, таких как циклы. Кроме того, <code>var</code> поддерживает поднятие, что позволяет обращаться к переменной до ее объявления, хотя её значение будет <code>undefined</code>, если не было присвоено до этого.</li><li><code>let</code> — это более современный способ объявления переменных, который имеет блочную область видимости. Это значит, что переменная существует только внутри блока, где она объявлена. <code>let</code> не поднимается, как <code>var</code>, что делает поведение более предсказуемым.</li><li><code>const</code> — как и <code>let</code>, имеет блочную область видимости, но отличается тем, что значение переменной нельзя переназначить. Это используется для значений, которые не должны изменяться, как, например, ссылки на объекты или примитивы.</li></ol><p>&nbsp;</p><p>Пример:</p><p>&nbsp;</p><p><code>if (true) {\n &nbsp; &nbsp;var a = 1; &nbsp; // доступно везде в функции\n &nbsp; &nbsp;let b = 2; &nbsp; // доступно только внутри блока\n &nbsp; &nbsp;const c = 3; // тоже доступно только внутри блока\n}</code></p>',
			shortAnswer:
				'<p><code>var</code> имеет функциональную область видимости, поддерживает поднятие и может быть переназначен. <code>let</code> имеет блочную область видимости и также может быть переназначен. <code>const</code> тоже имеет блочную область видимости, но его значение нельзя переназначить.</p>',
			status: 'public',
			rate: 2,
			complexity: 2,
			createdAt: '2024-10-12T16:52:32.814Z',
			updatedAt: '2024-10-12T16:52:32.814Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 155,
			title: 'Перечислите все типы данных в JavaScript?',
			description:
				'Этот вопрос проверяет знание различных типов данных, которые могут использоваться в JavaScript.',
			code: null,
			imageSrc: null,
			keywords: ['примитивы', 'типы данных'],
			longAnswer:
				'<p>В JavaScript есть следующие типы данных:</p><p>&nbsp;</p><ol><li>Примитивные типы:<ul><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">string</code> — для строковых данных (например, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">"Hello"</code>).</li><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">number</code> — для чисел, как целых, так и с плавающей запятой (например, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">42</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">3.14</code>).</li><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">boolean</code> — для логических значений <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">true</code> и <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">false</code>.</li><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">null</code> — специальное значение, обозначающее "ничто".</li><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">undefined</code> — значение, которое присваивается переменной по умолчанию, если ей не было присвоено другое значение.</li><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">symbol</code> — уникальные и неизменяемые идентификаторы, введенные в ES6.</li><li><code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">bigint</code> —&nbsp;для работы с целыми числами произвольной длины</li></ul></li><li>Тип <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">object</code> — более сложная структура, которая может хранить коллекции данных или более сложные сущности, такие как массивы, функции и объекты.</li></ol><p>&nbsp;</p><p>Пример:</p><p>&nbsp;</p><pre style="border-radius: 12px; border: 1px solid #FDF4FF; padding: 20px; margin: 20px 0; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);"><code class="language-javascript" style="border-radius: 12px; border: none; padding: 0; background: none;">let name = "Alice";      // string \nlet age = 25;            // number \nlet isStudent = true;    // boolean \nlet course = null;       // null \nlet address;             // undefined \nlet id = Symbol(\'id\');   // symbol \nlet bigNumber = 123456789012345678901234567890n; // bigint\nlet user = { name, age };// object</code></pre>',
			shortAnswer:
				'<p>В JavaScript есть восемь типов данных: <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">string</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">number</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">boolean</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">null</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">undefined</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">symbol</code>, <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">bigint</code>. Также существует тип <code style="border-radius: 12px; padding: 1.5px 5px; background: linear-gradient(180deg, #FFFFFF 0%, #E8DAFF 100%);">object</code>, который включает массивы, функции и объекты.</p>',
			status: 'public',
			rate: 3,
			complexity: 2,
			createdAt: '2024-10-12T16:53:45.873Z',
			updatedAt: '2024-10-29T18:12:00.703Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
			updatedBy: {
				id: 'bc475b16-8d73-4dd1-9cb9-5214feca6eae',
				username: 'daryakrutova',
			},
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
			id: 156,
			title: 'Что вернет typeof null?',
			description:
				'Этот вопрос проверяет понимание работы оператора typeof и особенностей работы с типами данных в JavaScript.',
			code: null,
			imageSrc: null,
			keywords: ['typeof', 'null', 'object', 'типы данных'],
			longAnswer:
				'<p>Оператор <code>typeof</code> используется для определения типа данных переменной. Однако в JavaScript есть одна известная ошибка — при вызове <code>typeof null</code> результат будет "object". Это поведение объясняется исторической особенностью языка. Хотя <code>null</code> технически не является объектом, его тип возвращается как "object". На самом деле, <code>null</code> — это примитивный тип данных, который используется для обозначения отсутствия какого-либо значения.</p><p>&nbsp;</p><p>Пример:</p><p>&nbsp;</p><p><code>console.log(typeof null); // "object"\n</code></p><p>&nbsp;</p><p>Хотя это поведение может показаться неинтуитивным, важно знать о нем при работе с JavaScript.</p>',
			shortAnswer:
				'<p>В JavaScript результат вызова <code>typeof null</code> — это "object". Это известная ошибка в языке, так как <code>null</code> на самом деле не является объектом. Это поведение осталось в языке по историческим причинам.</p>',
			status: 'public',
			rate: 1,
			complexity: 4,
			createdAt: '2024-10-12T16:56:12.906Z',
			updatedAt: '2024-10-12T16:56:12.906Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 157,
			title:
				'Что такое NaN? Какого типа это значение? Как можно узнать, равно ли значение переменной NaN?',
			description:
				'Этот вопрос проверяет знание работы с числовыми значениями и особенностей NaN (Not-a-Number) в JavaScript.',
			code: null,
			imageSrc: null,
			keywords: ['nan', 'number', 'isnan', 'типы данных'],
			longAnswer:
				'<p><code>NaN</code> (Not-a-Number) — это значение в JavaScript, которое появляется, когда операция, предназначенная для работы с числами, возвращает некорректный результат. Например, при делении строки на число или при попытке преобразовать некорректные данные в число. Несмотря на то, что NaN обозначает "не число", его тип в JavaScript — это <code>number</code>.</p><p>&nbsp;</p><p>Особенностью NaN является то, что оно не равно даже самому себе. Это означает, что проверка <code>NaN === NaN</code> всегда возвращает <code>false</code>. Для определения, является ли значение NaN, используются функции <code>isNaN()</code> и <code>Number.isNaN()</code>. <code>isNaN()</code> пытается преобразовать значение в число перед проверкой, в то время как <code>Number.isNaN()</code> строго проверяет, является ли значение именно NaN.</p><p>&nbsp;</p><p>Пример:</p><p>&nbsp;</p><p><code>console.log(NaN === NaN); &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;// false\nconsole.log(isNaN("hello")); &nbsp; &nbsp; &nbsp; // true, потому что строку нельзя преобразовать в число\nconsole.log(Number.isNaN(NaN)); &nbsp; &nbsp;// true\nconsole.log(Number.isNaN("hello"));// false, потому что это не NaN, а просто строка</code></p>',
			shortAnswer:
				'<p><code>NaN</code> (Not-a-Number) — это специальное значение, представляющее результат нечисловой операции, которая должна возвращать число. <code>NaN</code> является типом <code>number</code>, но не равен ни одному значению, даже самому себе. Чтобы проверить, является ли значение NaN, используется функция <code>isNaN()</code> или <code>Number.isNaN()</code>.</p>',
			status: 'public',
			rate: 3,
			complexity: 4,
			createdAt: '2024-10-12T16:57:22.135Z',
			updatedAt: '2024-10-12T16:57:22.135Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 158,
			title: 'Какие унарные операторы вы знаете?',
			description:
				'Этот вопрос проверяет знание унарных операторов, которые работают с одним операндом в JavaScript.',
			code: null,
			imageSrc: null,
			keywords: ['операторы', 'унарный'],
			longAnswer:
				'<p>Унарные операторы — это операторы, которые применяются к одному операнду. В JavaScript существуют несколько унарных операторов:</p><p>&nbsp;</p><ol><li><p>Унарный плюс (<code>+</code>): используется для преобразования операнда в число.</p><p>&nbsp;</p><p><code>let a = "5";\nconsole.log(+a); // 5\n</code></p></li><li><p>Унарный минус (<code>-</code>): преобразует операнд в отрицательное число.</p><p>&nbsp;</p><p><code>let b = 10;\nconsole.log(-b); // -10\n</code></p></li><li><p>Инкремент (<code>++</code>): увеличивает значение переменной на единицу. Может быть префиксным или постфиксным.</p><p>&nbsp;</p><p><code>let c = 5;\nconsole.log(++c); // 6 (префиксный)\nconsole.log(c++); // 6 (постфиксный, сначала возвращает, потом увеличивает)\n</code></p></li><li><p>Декремент (<code>--</code>): уменьшает значение переменной на единицу. Тоже может быть префиксным или постфиксным.</p><p>&nbsp;</p><p><code>let d = 5;\nconsole.log(--d); // 4 (префиксный)\nconsole.log(d--); // 4 (постфиксный)\n</code></p></li><li><p>Логическое НЕ (<code>!</code>): преобразует значение в его противоположное логическое значение (true становится false и наоборот).</p><p>&nbsp;</p><p><code>let e = true;\nconsole.log(!e); // false\n</code></p></li><li><p><code>typeof</code>: возвращает строку, обозначающую тип операнда.</p><p>&nbsp;</p><p><code>console.log(typeof 123); // "number"\n</code></p></li><li><p><code>delete</code>: удаляет свойство объекта.</p><p>&nbsp;</p><p><code>let obj = { name: "Alice" };\ndelete obj.name;\nconsole.log(obj.name); // undefined\n</code></p></li></ol><p>&nbsp;</p><p>Эти операторы позволяют изменять значение переменных, проверять их типы или выполнять логические операции.</p>',
			shortAnswer:
				'<p>Унарные операторы — это операторы, которые работают с одним операндом. В JavaScript к ним относятся: унарный плюс (<code>+</code>), унарный минус (<code>-</code>), оператор инкремента (<code>++</code>), оператор декремента (<code>--</code>), логический оператор НЕ (<code>!</code>), оператор typeof и оператор delete.</p>',
			status: 'public',
			rate: 1,
			complexity: 2,
			createdAt: '2024-10-12T16:59:00.457Z',
			updatedAt: '2024-10-12T16:59:00.457Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 159,
			title: 'Какие бинарные операторы вы знаете?',
			description:
				'Этот вопрос проверяет знание бинарных операторов, которые работают с двумя операндами, и их применение в JavaScript.',
			code: null,
			imageSrc: null,
			keywords: ['операторы', 'бинарные', 'арифметика'],
			longAnswer:
				"<p>Бинарные операторы требуют два операнда для выполнения операции. В JavaScript существует несколько категорий бинарных операторов:</p><p>&nbsp;</p><ol><li><p><strong>Арифметические операторы</strong>: они выполняют математические операции.</p><ul><li><code>+</code> (сложение)</li><li><code>-</code> (вычитание)</li><li><code>*</code> (умножение)</li><li><code>/</code> (деление)</li><li><code>%</code> (остаток от деления)</li></ul><p><code>let a = 5, b = 2;\nconsole.log(a + b); // 7\nconsole.log(a * b); // 10\n</code></p></li><li><p><strong>Операторы сравнения</strong>: они используются для сравнения значений.</p><ul><li><code>==</code> (нестрогое равенство)</li><li><code>===</code> (строгое равенство)</li><li><code>!=</code> (неравенство)</li><li><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> (меньше, больше, меньше или равно, больше или равно)</li></ul><p><code>console.log(5 == '5'); // true (нестрогое сравнение)\nconsole.log(5 === '5'); // false (строгое сравнение)\n</code></p></li><li><p><strong>Логические операторы</strong>: они работают с логическими значениями (boolean).</p><ul><li><code>&amp;&amp;</code> (логическое И)</li><li><code>||</code> (логическое ИЛИ)</li></ul><p><code>let x = true, y = false;\nconsole.log(x &amp;&amp; y); // false\nconsole.log(x || y); // true\n</code></p></li><li><p><strong>Операторы побитовых операций</strong>: работают на уровне битов чисел.</p><ul><li><code>&amp;</code> (побитовое И)</li><li><code>|</code> (побитовое ИЛИ)</li><li><code>^</code> (побитовое исключающее ИЛИ)</li><li><code>&gt;&gt;</code>, <code>&lt;&lt;</code> (сдвиг вправо, сдвиг влево)</li></ul><p><code>console.log(5 &amp; 1); // 1 (в двоичной системе: 0101 &amp; 0001 = 0001)\n</code></p></li><li><p><strong>Оператор присваивания</strong>: присваивает значение переменной.</p><ul><li><code>=</code> (присваивание)</li></ul><p><code>let z = 10;\n</code></p></li></ol><p>&nbsp;</p><p>Бинарные операторы являются основой для многих операций в JavaScript и используются для выполнения математических операций, сравнения значений и работы с логикой.</p>",
			shortAnswer:
				'<p>Бинарные операторы работают с двумя операндами. К ним относятся арифметические операторы (<code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>), операторы сравнения (<code>==</code>, <code>===</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>), логические операторы (<code>&amp;&amp;</code>, <code>||</code>), операторы побитовых операций (<code>&amp;</code>, <code>|</code>, <code>^</code>, <code>&gt;&gt;</code>, <code>&lt;&lt;</code>), а также оператор присваивания (<code>=</code>).</p>',
			status: 'public',
			rate: 1,
			complexity: 2,
			createdAt: '2024-10-12T17:55:57.423Z',
			updatedAt: '2024-10-12T17:55:57.423Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 160,
			title: 'Что такое тернарный оператор?',
			description:
				'Этот вопрос проверяет знание тернарного оператора и его использование для коротких условных выражений.',
			code: null,
			imageSrc: null,
			keywords: ['оператор', 'тернарный'],
			longAnswer:
				'<p>Тернарный оператор (или условный оператор) в JavaScript позволяет упростить запись обычного условия <code>if...else</code>.&nbsp;</p><p>&nbsp;</p><p>Это полезно для коротких и простых условий, где нужно выбрать одно из двух значений. Синтаксис тернарного оператора:</p><p>&nbsp;</p><p><code>условие ? выражение1 : выражение2;\n</code></p><p>&nbsp;</p><p>Если условие истинно (true), выполняется первое выражение, если ложно (false) — второе. Например:</p><p>&nbsp;</p><p><code>let age = 18;\nlet message = age &gt;= 18 ? "Взрослый" : "Несовершеннолетний";\nconsole.log(message); // "Взрослый"\n</code></p><p>&nbsp;</p><p>Этот код эквивалентен следующему:</p><p>&nbsp;</p><p><code>if (age &gt;= 18) {\n &nbsp;message = "Взрослый";\n} else {\n &nbsp;message = "Несовершеннолетний";\n}\n</code></p><p>&nbsp;</p><p>Тернарный оператор часто используется для упрощения простых условий, особенно при присваивании значений переменным или в JSX при работе с React.</p>',
			shortAnswer:
				'<p>Тернарный оператор — это короткий способ записи условного оператора <code>if...else</code>. Синтаксис выглядит так: <code>условие ? выражение1 : выражение2</code>. Если условие истинно, выполняется <code>выражение1</code>, если ложно — <code>выражение2</code>.</p>',
			status: 'public',
			rate: 1,
			complexity: 1,
			createdAt: '2024-10-12T17:57:24.153Z',
			updatedAt: '2024-10-12T17:57:24.153Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 161,
			title: 'Как происходит преобразовывание типов?',
			description:
				'Этот вопрос проверяет знание автоматического и явного преобразования типов в JavaScript.',
			code: null,
			imageSrc: null,
			keywords: ['типы данных', 'преобразование типов'],
			longAnswer:
				'<p>В JavaScript преобразование типов — это процесс приведения значений одного типа к другому. Существует два вида преобразования: неявное (автоматическое) и явное.</p><p>&nbsp;</p><ol><li><p><strong>Неявное (автоматическое) преобразование</strong>: JavaScript автоматически преобразует типы данных при выполнении операций. Например, если вы сложите строку с числом, JavaScript преобразует число в строку.</p><p>&nbsp;</p><p><code>let result = \'5\' + 3; // "53", число 3 преобразуется в строку\n</code></p></li><li><strong>Явное преобразование</strong>: Программист сам задает, как и когда преобразовать тип данных с помощью функций:<ul><li><code>Number()</code> — преобразует значение в число.</li><li><code>String()</code> — преобразует значение в строку.</li><li><code>Boolean()</code> — преобразует значение в булево.</li></ul></li></ol><p>&nbsp;</p><p>Примеры явного преобразования:</p><p>&nbsp;</p><p><code>let str = "123";\nlet num = Number(str); // Преобразуем строку в число\nconsole.log(num); // 123\n\nlet bool = Boolean(1); // Преобразуем число в булево\nconsole.log(bool); // true\n</code></p><p>&nbsp;</p><p>Важно понимать разницу между этими видами преобразований, так как неявное преобразование может привести к неожиданным результатам в коде, особенно при сложных операциях.</p>',
			shortAnswer:
				'<p>Преобразование типов в JavaScript может быть автоматическим (неявным) или явным. Автоматическое преобразование происходит, когда JavaScript пытается привести одно значение к нужному типу (например, строка к числу). Явное преобразование выполняется с помощью функций, таких как <code>Number()</code>, <code>String()</code> или <code>Boolean()</code>.</p>',
			status: 'public',
			rate: 1,
			complexity: 2,
			createdAt: '2024-10-12T17:58:33.504Z',
			updatedAt: '2024-10-12T17:58:33.504Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
			id: 162,
			title: 'Какие операторы сравнения вы знаете?',
			description:
				'Этот вопрос проверяет знание различных операторов сравнения в JavaScript и их использование для проверки равенства, неравенства и сравнения величин.',
			code: null,
			imageSrc: null,
			keywords: ['равенство', 'операторы', 'сравнение'],
			longAnswer:
				"<p>В JavaScript операторы сравнения используются для сопоставления значений. Они позволяют проверить, равны ли значения, и как одно значение соотносится с другим. Основные операторы:</p><p>&nbsp;</p><ol><li><strong>Равенство и неравенство</strong>:<ul><li><code>==</code> (нестрогое равенство): сравнивает значения без учета типов. Пример: <code>5 == '5'</code> вернет <code>true</code>, так как происходит преобразование типов.</li><li><code>===</code> (строгое равенство): сравнивает значения с учетом типов. Пример: <code>5 === '5'</code> вернет <code>false</code>, так как один операнд — число, а другой — строка.</li><li><code>!=</code> (нестрогое неравенство): проверяет, не равны ли значения без учета типов. Пример: <code>5 != '6'</code> вернет <code>true</code>.</li><li><code>!==</code> (строгое неравенство): проверяет, не равны ли значения с учетом типов. Пример: <code>5 !== '5'</code> вернет <code>true</code>.</li></ul></li><li><p><strong>Сравнение величин</strong>:</p><ul><li><code>&lt;</code> (меньше), <code>&gt;</code> (больше), <code>&lt;=</code> (меньше или равно), <code>&gt;=</code> (больше или равно) — используются для сравнения чисел или строк.</li></ul><p><code>console.log(3 &gt; 2); // true\nconsole.log('a' &lt; 'b'); // true (сравнение по Unicode)\n</code></p></li></ol><p>&nbsp;</p><p>Эти операторы широко используются для проверки условий в циклах, функциях, и выражениях <code>if...else</code>, чтобы сделать логику программы гибкой и динамичной.</p>",
			shortAnswer:
				'<p>Операторы сравнения в JavaScript включают: <code>==</code> (нестрогое равенство), <code>===</code> (строгое равенство), <code>!=</code> (нестрогое неравенство), <code>!==</code> (строгое неравенство), <code>&lt;</code> (меньше), <code>&gt;</code> (больше), <code>&lt;=</code> (меньше или равно), <code>&gt;=</code> (больше или равно). Они возвращают булево значение: <code>true</code> или <code>false</code>, в зависимости от результата сравнения.</p>',
			status: 'public',
			rate: 1,
			complexity: 1,
			createdAt: '2024-10-12T18:00:45.693Z',
			updatedAt: '2024-10-12T18:00:45.693Z',
			createdBy: {
				id: '0a1438a3-1776-43b4-9a95-e60ee6573903',
				username: 'ruslankuyanets',
			},
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
	page: 1,
	limit: 10,
	total: 30,
};

export const mostDifficultQuestions: MostDifficultQuestionsResponse = {
	id: 1,
	specialization: {
		id: 1,
		title: 'React',
		description: 'React разработчик',
		imageSrc: 'http://example.com/image.jpg',
		createdAt: '2024-12-10T10:00:00.000Z',
		updatedAt: '2024-12-10T10:00:00.000Z',
	},
	calculatedAt: '2024-12-10T10:00:00.000Z',
	topStat: [
		{
			questionId: 1,
			title: 'Что такое Virtual DOM, и как он работает?',
			answersCount: 82,
			stat: 1,
		},
		{
			questionId: 1,
			title: 'Как работает event loop в JavaScript?',
			answersCount: 72,
			stat: 1,
		},
		{
			questionId: 1,
			title: 'Что такое Virtual DOM, и как он работает?',
			answersCount: 62,
			stat: 1,
		},
		{
			questionId: 1,
			title: 'Как работает event loop в JavaScript?',
			answersCount: 52,
			stat: 1,
		},
		{
			questionId: 1,
			title: 'Что такое Virtual DOM, и как он работает?',
			answersCount: 42,
			stat: 1,
		},
		{
			questionId: 1,
			title: 'Как работает event loop в JavaScript?',
			answersCount: 32,
			stat: 1,
		},
	],
};
