import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const registerSchema = yup.object().shape({
	firstName: yup
		.string()
		.trim()
		.min(2, 'Введите корректное имя (не менее 2 символов)')
		.required('Поле обязательно для заполнения'),
	lastName: yup
		.string()
		.trim()
		.min(2, 'Введите корректную фамилию (не менее 2 символов)')
		.required('Поле обязательно для заполнения'),
	phone: yup
		.string()
		.matches(/^\+7-\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона')
		.required('Поле обязательно для заполнения'),
	email: yup.string().email('Введите корректный email').required('Поле обязательно для заполнения'),
	password: yup
		.string()
		.min(8, 'Пароль должен содержать минимум 8 символов')
		.required('Поле обязательно для заполнения'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароль должен совпадать')
		.matches(passwordRules, {
			message: 'Пароль должен содержать заглавные и строчные буквы, цифры и специальные символы',
		})
		.required('Поле обязательно для заполнения'),
	isChecked: yup
		.boolean()
		.oneOf(
			[true],
			'Для регистрации необходимо согласиться на обработку персональных данных и условия соглашения',
		)
		.required('Ячейка обязательна для заполнения'),
});
