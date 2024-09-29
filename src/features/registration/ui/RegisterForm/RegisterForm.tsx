import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { Button, Icon, Input } from 'yeahub-ui-kit';

import { SignUp, useRegisterMutation } from '@/entities/auth';

import styles from './RegisterForm.module.css';

interface RegistrationValidation extends SignUp {
	isChecked: boolean;
	passwordConfirmation: string;
}

export const RegisterForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [registrationMutation, { isLoading }] = useRegisterMutation();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useFormContext<RegistrationValidation>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onRegistration = async (data: SignUp) => {
		await registrationMutation(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles['form-wrapper']}>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="name">
						Имя
					</label>
					<Input
						className={styles.input}
						{...register('firstName')}
						placeholder="Введите имя"
						hasError={!!errors.firstName?.message}
					/>
					{errors.firstName ? <div className={styles.error}>{errors.firstName.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="surname">
						Фамилия
					</label>
					<Input
						className={styles.input}
						{...register('lastName')}
						placeholder="Введите фамилию"
						hasError={!!errors.lastName?.message}
					/>
					{errors.lastName ? <div className={styles.error}>{errors.lastName.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="phone">
						Номер телефона
					</label>
					<InputMask
						{...register('phone')}
						className={styles.phone}
						mask={'+7-(999)-999-99-99'}
						placeholder={'+7-(XXX)-XXX-XX-XX'}
					/>
					{errors.phone ? <div className={styles.error}>{errors.phone.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="email">
						Электронная почта
					</label>
					<Input
						className={styles.input}
						{...register('email')}
						placeholder="Введите электронную почту"
						hasError={!!errors.email?.message}
					/>
					{errors.email ? <div className={styles.error}>{errors.email.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="password">
						Пароль
					</label>
					<Input
						className={styles.input}
						{...register('password')}
						placeholder="Введите пароль"
						type={isPasswordHidden ? 'text' : 'password'}
						hasError={!!errors.password?.message}
						suffix={
							<Icon
								className={styles.icon}
								onClick={handleShowPassword}
								icon="password"
								arg={isPasswordHidden}
								color="--palette-ui-black-300"
							/>
						}
					/>
					{errors.password ? <div className={styles.error}>{errors.password.message}</div> : null}
				</div>
				<div className={styles['input-wrapper']}>
					<label className={styles.label} htmlFor="repeatPassword">
						Подтвердить пароль
					</label>
					<Input
						className={styles.input}
						{...register('passwordConfirmation')}
						placeholder="Введите пароль"
						type={isPasswordHidden ? 'text' : 'password'}
						hasError={!!errors.passwordConfirmation?.message}
						suffix={
							<Icon
								className={styles.icon}
								onClick={handleShowPassword}
								icon="password"
								arg={isPasswordHidden}
								color="--palette-ui-black-300"
							/>
						}
					/>
					{errors.passwordConfirmation ? (
						<div className={styles.error}>{errors.passwordConfirmation.message}</div>
					) : null}
				</div>
			</div>
			<Button
				disabled={isLoading}
				onClick={handleSubmit(onRegistration)}
				theme="primary"
				className={styles['submit-button']}
			>
				Зарегистрироваться
			</Button>
			<div className={styles['input-wrapper']}>
				<label className={styles['consent-wrapper']} htmlFor="isChecked">
					<input type="checkbox" className={styles.checkbox} {...register('isChecked')} />
					<span className={styles['consent-text']}>
						Нажимая «Зарегистрироваться», вы соглашаетесь на обработку персональных данных и условия
						сервиса
					</span>
				</label>
				{errors.isChecked ? <div className={styles.error}>{errors.isChecked.message}</div> : null}
			</div>
		</div>
	);
};
