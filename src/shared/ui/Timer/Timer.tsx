import { useState, useEffect, useLayoutEffect } from 'react';

import { getFromLS, setToLS, removeFromLS } from '@/shared/helpers/manageLocalStorage';

import styles from './Timer.module.css';

interface TimerProps {
	duration: number;
	setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
	isTimerStartedKey: string;
	timerStartTimeKey: string;
	isVisible?: boolean;
	className?: string;
}

export const Timer = ({
	duration,
	setIsDisabled,
	className,
	isTimerStartedKey,
	isVisible,
	setIsVisible,
	timerStartTimeKey,
}: TimerProps) => {
	const [timeLeft, setTimeLeft] = useState(duration);

	const isTimerStarted = getFromLS(timerStartTimeKey);

	useEffect(() => {
		if (isVisible && !getFromLS(isTimerStartedKey)) {
			setToLS(timerStartTimeKey, Date.now());
			setToLS(isTimerStartedKey, true);
			setIsDisabled(true);
			setTimeLeft(duration);
		}

		if (isTimerStarted !== null) {
			const elapsed = Math.floor((Date.now() - parseFloat(isTimerStarted)) / 1000);
			setTimeLeft(Math.max(0, duration - elapsed));
		}

		let timerInterval: NodeJS.Timeout | undefined;

		if (timeLeft > 0) {
			timerInterval = setInterval(() => {
				setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
			}, 1000);
		}

		if (timeLeft === 0) {
			removeFromLS(timerStartTimeKey);
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

	return timeLeft > 0 && isTimerStarted ? (
		<div className={className}>{timeLeft}</div>
	) : (
		<div className={styles['timer-plug']} />
	);
};
