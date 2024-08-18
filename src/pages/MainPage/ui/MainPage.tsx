import { FC, useCallback, useEffect, useState } from 'react';
import { Button } from 'yeahub-ui-kit';

import { useAppSelector } from '@/shared/hooks/useAppSelector';
import { Block } from '@/shared/ui/Block';

import { GetProfileResponse } from '@/entities/auth';

import styles from './MainPage.module.css';

const MainPage: FC = () => {
	const [percentProfileFullness, setPercentProfileFullness] = useState<number>(0);

	const { profile } = useAppSelector((state) => state.auth);

	const getPercentProfileFullness = useCallback((profile: GetProfileResponse) => {
		const allFileldsCount = Object.keys(profile).length - 1;
		const fullnessCount =
			Object.values(profile).filter((item) => item && item.length > 0).length - 1;

		const percentFullness = Math.round((fullnessCount / allFileldsCount) * 100);
		return percentFullness;
	}, []);

	useEffect(() => {
		if (profile) {
			const percentFullness = getPercentProfileFullness(profile);
			setPercentProfileFullness(percentFullness as number);
		}
	}, [getPercentProfileFullness, profile]);

	const isIncompleteProfile = percentProfileFullness < 100;

	return (
		<>
			{profile && (
				<div className={styles.wrapper}>
					<h2 className={styles.title}>Привет, {profile.firstName}!</h2>
					{isIncompleteProfile && (
						<Block className={styles.block}>
							<div className={styles['block-wrapper']}>
								<div className={styles['block-content']}>
									<h3 className={styles['block-title']}>
										Профиль заполнен на {percentProfileFullness}%
									</h3>
									<p className={styles['block-text']}>
										Заполните свой профиль, чтобы мир мог увидеть вашу уникальность и вдохновиться
										вашими достижениями. Каждая деталь добавляет картины вашей истории успеха
									</p>
								</div>
								<Button className={styles.button} size="large">
									Заполнить профиль
								</Button>
							</div>
						</Block>
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
