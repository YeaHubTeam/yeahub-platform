import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox, Icon, Input } from 'yeahub-ui-kit';

import { Button } from '@/shared/ui/Button';
import { FormControl } from '@/shared/ui/FormControl';
import { InputPhone } from '@/shared/ui/InputPhone';

import { SignUpFormValues, useRegisterMutation } from '@/entities/auth';

import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
	const [isPasswordHidden, setIsPasswordHidden] = useState(false);
	const [registrationMutation, { isLoading }] = useRegisterMutation();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useFormContext<SignUpFormValues>();

	const handleShowPassword = () => {
		setIsPasswordHidden((prev) => !prev);
	};

	const onRegistration = async (data: SignUpFormValues) => {
		await registrationMutation(data);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles['form-wrapper']}>
				<div className={styles['input-wrapper']}>
					<FormControl name="firstName" control={control} label={'Имя'}>
						{(field) => <Input {...field} className={styles.input} placeholder="Введите имя" />}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="lastName" control={control} label={'Фамилия'}>
						{(field) => <Input {...field} className={styles.input} placeholder="Введите фамилию" />}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="phone" control={control} label={'Номер телефона'}>
						{(field) => (
							<InputPhone fields={field} className={'registration'} hasError={!!errors.phone} />
						)}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="email" control={control} label={'Электронная почта'}>
						{(field) => (
							<Input {...field} className={styles.input} placeholder="Введите электронную почту" />
						)}
					</FormControl>
				</div>
				<div className={styles['input-wrapper']}>
					<FormControl name="password" control={control} label={'Пароль'}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder="Введите пароль"
								type={isPasswordHidden ? 'text' : 'password'}
								suffix={
									<Icon
										onClick={handleShowPassword}
										icon="password"
										arg={isPasswordHidden}
										color={
											errors.password?.message ? '--palette-ui-red-700' : '--palette-ui-black-300'
										}
										size={24}
									/>
								}
							/>
						)}
					</FormControl>
				</div>

				<div className={styles['input-wrapper']}>
					<FormControl name="passwordConfirmation" control={control} label={'Подтвердить пароль'}>
						{(field) => (
							<Input
								{...field}
								className={styles.input}
								placeholder="Введите пароль"
								type={isPasswordHidden ? 'text' : 'password'}
								suffix={
									<Icon
										onClick={handleShowPassword}
										icon="password"
										arg={isPasswordHidden}
										size={24}
										color={
											errors.passwordConfirmation?.message
												? '--palette-ui-red-700'
												: '--palette-ui-black-300'
										}
									/>
								}
							/>
						)}
					</FormControl>
				</div>
			</div>
			<Button
				disabled={isLoading}
				onClick={handleSubmit(onRegistration)}
				variant="primary"
				className={styles['submit-button']}
			>
				Зарегистрироваться
			</Button>
			<div className={styles['consent-wrapper']}>
				<FormControl name="isChecked" control={control}>
					{(field) => (
						<Checkbox
							{...field}
							className={styles.checkbox}
							label={
								'Нажимая «Зарегистрироваться», вы соглашаетесь на обработку персональных данных и условия сервиса'
							}
						/>
					)}
				</FormControl>
			</div>
		</div>
	);
};
