export type IconSize = 20 | 24 | 28 | 32;

export type IconName =
	| 'arrowRight'
	| 'arrowLeft'
	| 'arrowUpSquare'
	| 'arrowDownSquare'
	| 'thumbsDown'
	| 'thumbsUp'
	| 'clock'
	| 'calendar'
	| 'altArrowRight'
	| 'altArrowLeft'
	| 'dotsThree'
	| 'dotsThreeVertical'
	| 'more'
	| 'student'
	| 'clockCounterClockwise'
	| 'arrowShortDown'
	| 'slidersHorizontal'
	| 'search';

export type IconComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
