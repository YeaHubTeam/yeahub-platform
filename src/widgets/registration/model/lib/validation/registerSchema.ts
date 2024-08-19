import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

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
	phone: yup.string().min(2).required('Поле обязательно для заполнения'),
	email: yup.string().email('Введите корректный email').required('Поле обязательно для заполнения'),
	password: yup
		.string()
		.min(8, 'Пароль должен содержать минимум 8 символов')
		.required('Поле обязательно для заполнения'),
	passwordConfirmation: yup
		.string()
		.oneOf([yup.ref('password')], 'Пароль должен совпадать')
		.required(),
	isChecked: yup
		.boolean()
		.oneOf(
			[true],
			'Для регистрации необходимо согласиться на обработку персональных данных и условия соглашения',
		)
		.required(),
});
