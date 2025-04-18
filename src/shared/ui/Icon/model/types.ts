export type IconSize = 20 | 24 | 28 | 32;

export type IconName =
	| 'arrowRight'
	| 'arrowLeft'
	| 'arrowUpSquare'
	| 'arrowDownSquare'
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
	| 'search'
	| 'closeCircle'
	| 'trash'
	| 'pen'
	| 'eye'
	| 'eyeClosed'
	| 'like'
	| 'dislike'
	| 'instagram'
	| 'linkedin'
	| 'twitter'
	| 'facebook'
	| 'github'
	| 'behance'
	| 'whatsapp'
	| 'telegram'
	| 'youtube'
	| 'plus'
	| 'minus'
	| 'plusCircle'
	| 'imageEdit'
	| 'burger'
	| 'checkCircle'
	| 'warning'
	| 'filter'
	| 'settings'
	| 'sealCheck'
	| 'userSwitch'
	| 'trendUp'
	| 'notePencil'
	| 'clipboardText'
	| 'megaphone'
	| 'yeaHubCommunity';

export type IconComponent = React.FunctionComponent<React.SVGAttributes<SVGElement>>;
