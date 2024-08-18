import * as yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(yup);

export const loginSchema = yup.object().shape({
	username: yup.string().email('Введите корректный email').required(),
	password: yup.string().required('Введите пароль'),
});
