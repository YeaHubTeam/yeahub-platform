import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'yeahub-ui-kit';

import { Card } from '@/shared/ui/Card';

import { GetProfileResponse, useProfileQuery } from '@/entities/auth';

import styles from './MainPage.module.css';

const MainPage = () => {
	const [percentProfileFullness, setPercentProfileFullness] = useState<number>(0);

	const { data: profile } = useProfileQuery();

	const navigate = useNavigate();

	const getPercentProfileFullness = useCallback((profile: GetProfileResponse) => {
		const allFileldsCount = Object.keys(profile).length - 1;
		const fullnessCount =
			Object.values(profile).filter((item) => item && item.length > 0).length - 1;

		const percentFullness = Math.round((fullnessCount / allFileldsCount) * 100);
		return percentFullness;
	}, []);

	const redirectToProfileEditing = () => {
		navigate('/profile/edit#personal-information');
	};

	useEffect(() => {
		if (profile) {
			const percentFullness = getPercentProfileFullness(profile);
			setPercentProfileFullness(percentFullness);
		}
	}, [getPercentProfileFullness, profile]);

	const isIncompleteProfile = percentProfileFullness < 100;

	return (
		<>
			{profile && (
				<div className={styles.wrapper}>
					<h2 className={styles.title}>Привет, {profile.firstName}!</h2>
					{isIncompleteProfile && (
						<Card className={styles.card}>
							<div className={styles['card-wrapper']}>
								<div className={styles['card-content']}>
									<h3 className={styles['card-title']}>
										Профиль заполнен на {percentProfileFullness}%
									</h3>
									<p className={styles['card-text']}>
										Заполните свой профиль, чтобы мир мог увидеть вашу уникальность и вдохновиться
										вашими достижениями. Каждая деталь добавляет картины вашей истории успеха
									</p>
								</div>
								<Button onClick={redirectToProfileEditing} className={styles.button} size="large">
									Заполнить профиль
								</Button>
							</div>
						</Card>
					)}
				</div>
			)}
			<span className={styles.text}>
				Скоро здесь будут отображаться мероприятия сообщества, популярные статьи и многое ещё чего
				интересного.
			</span>
		</>
	);
};

export default MainPage;
