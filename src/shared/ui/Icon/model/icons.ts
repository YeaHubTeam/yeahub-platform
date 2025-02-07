import AltArrowLeft from '@/shared/assets/icons/altArrowLeft.svg';
import AltArrowRight from '@/shared/assets/icons/altArrowRight.svg';
import ArrowDownSquare from '@/shared/assets/icons/arrowDownSquare.svg';
import ArrowLeft from '@/shared/assets/icons/arrowLeft.svg';
import ArrowRight from '@/shared/assets/icons/arrowRight.svg';
import ArrowShortDown from '@/shared/assets/icons/arrowShortDown.svg';
import ArrowUpSquare from '@/shared/assets/icons/arrowUpSquare.svg';
import Calendar from '@/shared/assets/icons/calendar.svg';
import Clock from '@/shared/assets/icons/clock.svg';
import ClockCounterClockwise from '@/shared/assets/icons/clockCounterClockwise.svg';
import DotsThree from '@/shared/assets/icons/dotsThree.svg';
import DotsThreeVertical from '@/shared/assets/icons/dotsThreeVertical.svg';
import More from '@/shared/assets/icons/more.svg';
import Search from '@/shared/assets/icons/search.svg';
import SlidersHorizontal from '@/shared/assets/icons/slidersHorizontal.svg';
import Student from '@/shared/assets/icons/student.svg';
import ThumbsDown from '@/shared/assets/icons/thumbsDown.svg';
import ThumbsUp from '@/shared/assets/icons/thumbsUp.svg';

import { IconComponent, IconName } from './types';

export const icons: Record<IconName, IconComponent> = {
	arrowLeft: ArrowLeft,
	arrowRight: ArrowRight,
	arrowUpSquare: ArrowUpSquare,
	arrowDownSquare: ArrowDownSquare,
	thumbsDown: ThumbsDown,
	thumbsUp: ThumbsUp,
	clock: Clock,
	calendar: Calendar,
	altArrowLeft: AltArrowLeft,
	altArrowRight: AltArrowRight,
	dotsThree: DotsThree,
	dotsThreeVertical: DotsThreeVertical,
	more: More,
	student: Student,
	clockCounterClockwise: ClockCounterClockwise,
	arrowShortDown: ArrowShortDown,
	slidersHorizontal: SlidersHorizontal,
	search: Search,
};
