import classNames from 'classnames';
import React, { Dispatch, Key, SetStateAction } from 'react';

import { Icon } from '@/shared/ui/Icon';

import { Flex } from '../Flex';
import { Text } from '../Text';

import { stepperTestIds } from './constants';
import styles from './Stepper.module.css';
import type { Step } from './types';

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
		if (clickedIndex < activeStepIndex) return;

		if (clickedIndex <= activeStepIndex + 1) {
			setActiveStep(clickedStep);
		}
	};
	return (
		<Flex
			direction={isMobile ? 'row' : 'column'}
			componentType="ul"
			gap="20"
			className={classNames(isMobile ? styles['stepper-mobile'] : styles['stepper'], className)}
			dataTestId={stepperTestIds.stepper}
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
									className={classNames(styles['dashed-separator'], isMobile && styles.mobile)}
									data-testid={stepperTestIds.separator}
								/>
							)}
							<div
								className={classNames(
									styles['step-item'],
									isMobile ? styles['step-item-mobile'] : styles['step-item-desktop'],
									status === 'active' && styles.active,
								)}
								data-testid={stepperTestIds.item(String(step.id))}
							>
								<div
									className={classNames(
										styles['step-icon'],
										styles[`icon-${status}`],
										isMobile && styles.mobile,
									)}
									data-testid={stepperTestIds.icon(String(step.id))}
								>
									<Icon
										icon={status === 'completed' ? 'check' : step.image}
										color={status === 'completed' ? 'purple-700' : 'white-900'}
										size={isMobile ? 18 : 26}
									/>
								</div>
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
