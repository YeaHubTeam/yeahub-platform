export interface RangeProps {
	className?: string;
	value: number;
	min: number;
	max: number;
	hasScale?: boolean;
	step?: number;
	onChange: (value: number) => void;
	minValueIcon?: React.ReactNode;
	maxValueIcon?: React.ReactNode;
	valueLabel?: React.ReactNode;
}
