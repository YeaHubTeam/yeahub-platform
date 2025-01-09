export type IconSize = 20 | 24 | 28 | 32;

export type IconName =
	| 'arrowRight'
	| 'arrowUpSquare'
	| 'arrowDownSquare'
	| 'thumbsDown'
	| 'thumbsUp'
	| 'clock'
	| 'calendar'
	| 'altArrowRight'
	| 'altArrowLeft';

export type IconComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
