import { useState, useEffect, useLayoutEffect } from 'react';

import { getFromLS, setToLS, removeFromLS } from '@/shared/helpers/manageLocalStorage';

import styles from './Timer.module.css';

interface TimerProps {
	duration: number;
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	isTimerStartedKey: string;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isVisible?: boolean;
	className?: string;
}

const startTimeKey = 'startTime';

export const Timer = ({
	duration,
	setIsDisabled,
	className,
	isTimerStartedKey,
	isVisible,
	setIsVisible,
}: TimerProps) => {
	const [timeLeft, setTimeLeft] = useState(duration);

	useEffect(() => {
		if (isVisible && getFromLS(isTimerStartedKey) === null) {
			setToLS(startTimeKey, Date.now());
			setToLS(isTimerStartedKey, true);
			setIsDisabled(true);
			setTimeLeft(duration);
		}

		const initialTime = getFromLS(startTimeKey);

		if (initialTime !== null) {
			const elapsed = Math.floor((Date.now() - parseFloat(initialTime)) / 1000);
			setTimeLeft(Math.max(0, duration - elapsed));
		}

		let timerInterval: NodeJS.Timeout | undefined;

		if (timeLeft > 0) {
			timerInterval = setInterval(() => {
				setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
			}, 1000);
		}

		if (timeLeft === 0) {
			removeFromLS(startTimeKey);
			removeFromLS(isTimerStartedKey);
			setIsDisabled(false);
		}

		return () => {
			if (timerInterval) clearInterval(timerInterval);
		};
	}, [isVisible, timeLeft, isTimerStartedKey]);

	useLayoutEffect(() => {
		if (timeLeft === 0) {
			setIsVisible(false);
		}
	}, [timeLeft]);

	return (
		<>
			{timeLeft > 0 && getFromLS(isTimerStartedKey) ? (
				<div className={className}>{timeLeft}</div>
			) : (
				<div className={styles['timer-plug']}></div>
			)}
		</>
	);
};
