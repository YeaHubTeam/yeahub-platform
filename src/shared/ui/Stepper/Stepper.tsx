import cn from 'classnames';
import React, { Dispatch, Key, SetStateAction, type SVGProps } from 'react';

import StepCheck from '@/shared/assets/icons/stepCheck.svg';

import { Flex } from '../Flex';
import { Text } from '../Text';

import styles from './Stepper.module.css';

export interface Step<T> {
	id: T;
	label: string;
	image: React.FC<SVGProps<SVGSVGElement>>;
	Component: () => JSX.Element;
}

export interface StepperProps<T> {
	steps: Step<T>[];
	activeStep: Step<T>;
	setActiveStep: Dispatch<SetStateAction<Step<T>>>;
	className?: string;
	isMobile?: boolean;
}

export const Stepper = <T,>({
	steps,
	activeStep,
	setActiveStep,
	className,
	isMobile = false,
}: StepperProps<T>) => {
	const activeStepIndex = steps.findIndex((step) => step.id === activeStep.id);

	const getStepStatus = (currentIndex: number) => {
		if (currentIndex < activeStepIndex) return 'completed';
		if (currentIndex === activeStepIndex) return 'active';
		return 'inactive';
	};

	const onStepToggle = (clickedStep: Step<T>, clickedIndex: number) => {
		if (clickedIndex <= activeStepIndex + 1) {
			setActiveStep(clickedStep);
		}
	};
	return (
		<Flex
			direction={isMobile ? 'row' : 'column'}
			componentType={'ul'}
			gap={'20'}
			className={cn(isMobile ? styles['stepper-mobile'] : styles['stepper'], className)}
		>
			{steps.map((step, index) => {
				const status = getStepStatus(index);
				const isLastStep = index === steps.length - 1;
				return (
					<li key={step.id as Key}>
						{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
						<div
							className={styles['step-wrapper']}
							onClick={() => onStepToggle(step, index)}
							tabIndex={0}
							role="button"
						>
							{!isLastStep && (
								<div
									className={cn(styles['dashed-separator'], {
										[styles.mobile]: isMobile,
									})}
								/>
							)}
							<div
								className={cn(isMobile ? styles['step-item-mobile'] : styles['step-item'], {
									[styles.active]: status === 'active',
									[styles.completed]: status === 'completed',
								})}
							>
								{status === 'completed' ? <StepCheck /> : <step.image className={styles.icon} />}
								{!isMobile && (
									<Text
										variant="body3-strong"
										color={status === 'inactive' ? 'black-200' : 'white-900'}
									>
										{step.label}
									</Text>
								)}
							</div>
						</div>
					</li>
				);
			})}
		</Flex>
	);
};
