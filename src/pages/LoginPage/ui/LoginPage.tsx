import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react';
import { Button, Input } from 'yeahub-ui-kit';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Block } from '@/shared/ui/Block';
import { Loader } from '@/shared/ui/Loader';

import { useLoginMutation, useLogoutMutation } from '@/entities/auth';

import styles from './LoginPage.module.css';

const LoginPage: FC = () => {
	const [formState, setFormState] = useState<{ username: string; password: string }>({
		username: 'name@server.com',
		password: 'BestPassword2024',
	});

	const [loginUser, { isLoading: isLoadingLoginUser }] = useLoginMutation();
	const [logoutUser] = useLogoutMutation();

	const { accessToken, profile } = useAppSelector((state) => state.auth);

	const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmitForm: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		loginUser({ user: formState });
	};

	const handleLogoutUser = () => {
		logoutUser();
	};

	const loginTitle = accessToken ? `Привет, ${profile?.firstName}` : 'Авторизация';

	return (
		<>
			{isLoadingLoginUser ? (
				<Loader />
			) : (
				<Block className={styles.block}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>{loginTitle}</h2>
						{accessToken ? (
							<>
								<Button onClick={handleLogoutUser} size="large">
									Выйти из профиля
								</Button>
							</>
						) : (
							<form onSubmit={handleSubmitForm} className={styles.form}>
								<Input
									type="text"
									name="username"
									placeholder="Логин"
									value={formState.username}
									onChange={onChange}
								/>

								<Input
									type="password"
									name="password"
									placeholder="Пароль"
									value={formState.password}
									onChange={onChange}
								/>
								<Button type="submit">Войти</Button>
							</form>
						)}
					</div>
				</Block>
			)}
		</>
	);
};

export default LoginPage;
