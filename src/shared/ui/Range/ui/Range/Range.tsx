import cn from 'classnames';
import { useState, useRef, useEffect, ChangeEvent } from 'react';

import { RangeContext } from '../../lib/context/rangeContext';
import { RangeProps } from '../../model/types';
import { RangeLabel } from '../RangeLabel/RangeLabel';
import { RangeSteps } from '../RangeSteps/RangeSteps';
import { RangeUnits } from '../RangeUnits/RangeUnits';
import { RangeValue } from '../RangeValue/RangeValue';

import styles from './Range.module.css';

const thumbWidth = 22;

export const Range = (props: RangeProps) => {
	const {
		className,
		min = 0,
		max = 100,
		onChange,
		step,
		value,
		hasScale,
		maxValueIcon,
		minValueIcon,
	} = props;

	const [sliderWidth, setSliderWidth] = useState(0);
	const [isDraggable, setIsDraggable] = useState(false);

	const trackRef = useRef<HTMLDivElement | null>(null);
	const minInputRef = useRef<HTMLInputElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);
	const labelRef = useRef<HTMLDivElement>(null);

	const getPercentage = (value: number) => {
		return step ? ((value - min) / (max - min)) * 100 : (value / max) * 100;
	};

	const getLabelPosition = (value: number) => {
		if (!labelRef.current) return;
		labelRef.current.style.left = `${getPercentage(value)}%`;
	};

	useEffect(() => {
		const setWidth = () => {
			setSliderWidth(wrapperRef.current?.clientWidth || 0);
		};

		setWidth();
		getLabelPosition(value);
		window.addEventListener('resize', setWidth);
		return () => {
			window.removeEventListener('resize', setWidth);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
		setIsDraggable(true);
		getLabelPosition(+e.target.value);
	};

	const handleBlur = () => {
		setIsDraggable(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange(+e.target.value);
	};

	return (
		<RangeContext.Provider value={{ ...props, thumbWidth, sliderWidth, isDraggable }}>
			<div
				className={cn(styles['range'], className)}
				role="slider"
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={value}
			>
				{hasScale && <RangeSteps />}
				<RangeUnits />
				<div className={styles['container']}>
					<RangeValue icon={minValueIcon} value={min} />
					<div ref={wrapperRef} className={styles['wrapper']}>
						<div
							ref={trackRef}
							className={cn(styles['track'])}
							style={{ width: `${getPercentage(value)}%` }}
						></div>
						<input
							className={styles['slider']}
							max={max}
							min={min}
							name="min"
							onChange={handleChange}
							ref={minInputRef}
							step={step}
							type="range"
							value={value}
							onInput={handleInput}
							onBlur={handleBlur}
						/>
						<RangeLabel ref={labelRef} />
					</div>
					<RangeValue icon={maxValueIcon} value={max} />
				</div>
			</div>
		</RangeContext.Provider>
	);
};
