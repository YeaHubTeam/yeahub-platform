import { useState, useEffect, useRef } from 'react';

import { Flex } from '@/shared/ui/Flex';
import { Text } from '@/shared/ui/Text';

import styles from './AnalysisProgress.module.css';

interface AnalysisProgressProps {
	onComplete: () => void;
	onError: () => void;
	isError: boolean;
	isLoading: boolean;
}

const STEPS = [
	'Извлекаем информацию из резюме',
	'Сравниваем с требованиями рынка',
	'Анализируем навыки и ключевые слова',
	'Рассчитываем ATS Score',
];

const STEP_INTERVAL_MS = 1000;
const FINAL_STEP_WAIT_MS = 3000;

export const AnalysisProgress = ({
	onComplete,
	onError,
	isError,
	isLoading,
}: AnalysisProgressProps) => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [progress, setProgress] = useState(0);
	const [isCompleted, setIsCompleted] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const isLastStep = currentStepIndex === STEPS.length - 1;

	const cleanup = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	useEffect(() => {
		if (isError) {
			cleanup();
			onError();
		}
	}, [isError, onError]);

	useEffect(() => {
		if (isError) return;

		if (!isLoading && isLastStep) {
			setProgress(100);
			setIsCompleted(true);
			cleanup();
			setTimeout(() => {
				onComplete();
			}, 500);
			return;
		}

		if (isLastStep && isLoading) {
			timeoutRef.current = setTimeout(() => {}, FINAL_STEP_WAIT_MS);
			return;
		}

		if (!isLastStep && !isError) {
			intervalRef.current = setInterval(() => {
				setCurrentStepIndex((prev) => {
					const nextIndex = prev + 1;
					const newProgress = (nextIndex / STEPS.length) * 100;
					setProgress(newProgress);
					return nextIndex;
				});
			}, STEP_INTERVAL_MS);
		}

		return cleanup;
	}, [isLastStep, isLoading, isError, onComplete]);

	useEffect(() => {
		if (isLastStep && !isLoading && !isError && !isCompleted) {
			setProgress(100);
			setIsCompleted(true);
			cleanup();
			setTimeout(() => {
				onComplete();
			}, 500);
		}
	}, [isLastStep, isLoading, isError, isCompleted, onComplete]);

	const circumference = 2 * Math.PI * 45;
	const strokeDashoffset = circumference - (progress / 100) * circumference;

	if (isCompleted && !isError) {
		return (
			<Flex align="center" gap="12" className={styles.completed}>
				<Text variant="body2">Анализ резюме завершен</Text>
			</Flex>
		);
	}

	return (
		<div className={styles.wrapper}>
			<Flex align="center" gap="24" className={styles['top-section']}>
				<div className={styles['circle-wrapper']}>
					<svg className={styles['circular-progress']} viewBox="0 0 120 120">
						<circle
							className={styles['circle-bg']}
							cx="60"
							cy="60"
							r="45"
							strokeWidth="8"
							fill="none"
						/>
						<circle
							className={styles['circle-progress']}
							cx="60"
							cy="60"
							r="45"
							strokeWidth="8"
							fill="none"
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							transform="rotate(-90 60 60)"
							strokeLinecap="round"
						/>
					</svg>
					<div className={styles.percentage}>{Math.round(progress)}%</div>
				</div>

				<Flex direction="column" gap="4" className={styles['text-section']}>
					<Text variant="head2" className={styles.title}>
						Анализируем ваше резюме...
					</Text>
					<Text variant="body2" className={styles.subtitle}>
						Это может занять до 2 минут
					</Text>

					<div className={styles['steps-container']}>
						{STEPS.map((step, index) => {
							const isActive = index === currentStepIndex;
							const isStepCompleted = index < currentStepIndex;

							return (
								<div key={index} className={styles['step-wrapper']}>
									<div className={styles['step-dot-wrapper']}>
										<div
											className={`${styles['step-dot']} ${
												isStepCompleted ? styles['step-dot-completed'] : ''
											} ${isActive ? styles['step-dot-active'] : ''}`}
										/>
									</div>
									{index > 0 && (
										<div
											className={`${styles['step-line']} ${isStepCompleted ? styles['step-line-completed'] : ''}`}
										/>
									)}

									<Text
										variant="body1"
										className={`${styles['step-text']} ${
											isActive ? styles['step-text-active'] : ''
										} ${isStepCompleted ? styles['step-text-completed'] : ''}`}
									>
										{step}
									</Text>
								</div>
							);
						})}
					</div>
				</Flex>
			</Flex>

			<Flex justify="center" className={styles['warning-wrapper']}>
				<Flex align="center" gap="8" className={styles.warning}>
					<span className={styles['warning-icon']}>⚠️</span>
					<Text variant="body2" className={styles['warning-text']}>
						Пожалуйста, не закрывайте страницу
					</Text>
				</Flex>
			</Flex>
		</div>
	);
};
