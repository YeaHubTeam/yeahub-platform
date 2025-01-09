import AltArrowLeft from '@/shared/assets/icons/altArrowLeft.svg';
import AltArrowRight from '@/shared/assets/icons/altArrowRight.svg';
import ArrowDownSquare from '@/shared/assets/icons/arrowDownSquare.svg';
import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import ArrowUpSquare from '@/shared/assets/icons/arrowUpSquare.svg';
import Calendar from '@/shared/assets/icons/calendar.svg';
import Clock from '@/shared/assets/icons/clock.svg';
import ThumbsDown from '@/shared/assets/icons/thumbsDown.svg';
import ThumbsUp from '@/shared/assets/icons/thumbsUp.svg';

import { IconComponent, IconName } from './types';

export const icons: Record<IconName, IconComponent> = {
	arrowRight: ArrowRight,
	arrowUpSquare: ArrowUpSquare,
	arrowDownSquare: ArrowDownSquare,
	thumbsDown: ThumbsDown,
	thumbsUp: ThumbsUp,
	clock: Clock,
	calendar: Calendar,
	altArrowLeft: AltArrowLeft,
	altArrowRight: AltArrowRight,
};
