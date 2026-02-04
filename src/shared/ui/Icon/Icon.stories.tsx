import type { Meta, StoryObj } from '@storybook/react';

import { Icon, type IconProps } from './Icon';

const meta: Meta<typeof Icon> = {
	title: 'shared/Icon',
	component: Icon,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		icon: {
			control: 'select',
			options: [
				'arrowRight',
				'arrowLeft',
				'arrowUpSquare',
				'arrowDownSquare',
				'clock',
				'calendar',
				'check',
				'questions',
				'checkList',
				'handShake',
				'specialization',
				'graphUp',
				'keySquare',
				'altArrowRight',
				'altArrowLeft',
				'dotsThree',
				'dotsThreeVertical',
				'more',
				'student',
				'clockCounterClockwise',
				'arrowShortDown',
				'slidersHorizontal',
				'search',
				'closeCircle',
				'trash',
				'pen',
				'eye',
				'eyeClosed',
				'like',
				'dislike',
				'info',
				'instagram',
				'linkedin',
				'twitter',
				'facebook',
				'github',
				'githubWhite',
				'behance',
				'whatsapp',
				'telegram',
				'telegramWithBackground',
				'youtube',
				'youtubeWithBackground',
				'tiktok',
				'plus',
				'minus',
				'plusCircle',
				'imageEdit',
				'burger',
				'checkCircle',
				'warning',
				'filter',
				'settings',
				'sealCheck',
				'sealCheckOutlined',
				'userCheckWithBackground',
				'userSwitch',
				'trendUp',
				'notePencil',
				'clipboardText',
				'megaphone',
				'yeaHubCommunity',
				'figmaWhite',
				'logoText',
				'favorite',
				'favoriteRed',
				'listWithBackground',
				'thumbsDown',
				'thumbsUp',
				'cross',
				'burgerAndCross',
				'lamp',
				'tickWithBackground',
				'copy',
				'watch',
				'refresh',
			],
			description: 'Icon name to display',
		},
		size: {
			control: 'select',
			options: [14, 18, 20, 24, 26, 28, 32, 34, 36, 40],
			description: 'Icon size in pixels',
		},
		color: {
			control: 'select',
			options: [
				'purple-950',
				'purple-900',
				'purple-800',
				'purple-700',
				'purple-600',
				'purple-500',
				'purple-400',
				'purple-300',
				'purple-200',
				'purple-100',
				'purple-50',
				'red-900',
				'red-800',
				'red-700',
				'red-600',
				'red-500',
				'red-400',
				'red-300',
				'red-200',
				'red-100',
				'red-25',
				'yellow-900',
				'yellow-800',
				'yellow-700',
				'yellow-600',
				'yellow-500',
				'yellow-400',
				'yellow-300',
				'yellow-200',
				'green-900',
				'green-800',
				'green-750',
				'green-700',
				'green-600',
				'green-500',
				'green-400',
				'green-300',
				'green-200',
				'green-100',
				'green-007',
				'black-1000',
				'black-900',
				'black-850',
				'black-800',
				'black-700',
				'black-600',
				'black-500',
				'black-400',
				'black-300',
				'black-200',
				'black-150',
				'black-100',
				'black-50',
				'black-30',
				'black-25',
				'white-900',
			],
			description: 'Icon color from palette',
		},
	},
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

const createIconStory = (icon: IconProps['icon'], overrides?: Partial<IconProps>): Story => ({
	args: {
		icon,
		size: 24,
		color: 'black-900',
		...overrides,
	},
});

export const ArrowRight: Story = createIconStory('arrowRight');
export const ArrowLeft: Story = createIconStory('arrowLeft');
export const ArrowUpSquare: Story = createIconStory('arrowUpSquare');
export const ArrowDownSquare: Story = createIconStory('arrowDownSquare');
export const Clock: Story = createIconStory('clock');
export const Calendar: Story = createIconStory('calendar');
export const Questions: Story = createIconStory('questions');
export const HandShake: Story = createIconStory('handShake');
export const Specialization: Story = createIconStory('specialization');
export const KeySquare: Story = createIconStory('keySquare');
export const AltArrowRight: Story = createIconStory('altArrowRight');
export const AltArrowLeft: Story = createIconStory('altArrowLeft');
export const DotsThree: Story = createIconStory('dotsThree');
export const DotsThreeVertical: Story = createIconStory('dotsThreeVertical');
export const More: Story = createIconStory('more');
export const Student: Story = createIconStory('student');
export const ClockCounterClockwise: Story = createIconStory('clockCounterClockwise');
export const ArrowShortDown: Story = createIconStory('arrowShortDown');
export const SlidersHorizontal: Story = createIconStory('slidersHorizontal');
export const Search: Story = createIconStory('search');
export const Pen: Story = createIconStory('pen');
export const Eye: Story = createIconStory('eye');
export const EyeClosed: Story = createIconStory('eyeClosed');
export const Linkedin: Story = createIconStory('linkedin');
export const Twitter: Story = createIconStory('twitter');
export const Facebook: Story = createIconStory('facebook');
export const Github: Story = createIconStory('github');
export const Behance: Story = createIconStory('behance');
export const Telegram: Story = createIconStory('telegram');
export const TelegramWithBackground: Story = createIconStory('telegramWithBackground');
export const Tiktok: Story = createIconStory('tiktok');
export const Plus: Story = createIconStory('plus');
export const Minus: Story = createIconStory('minus');
export const ImageEdit: Story = createIconStory('imageEdit');
export const Burger: Story = createIconStory('burger');
export const Filter: Story = createIconStory('filter');
export const Settings: Story = createIconStory('settings');
export const UserCheckWithBackground: Story = createIconStory('userCheckWithBackground');
export const UserSwitch: Story = createIconStory('userSwitch');
export const NotePencil: Story = createIconStory('notePencil');
export const ClipboardText: Story = createIconStory('clipboardText');
export const Megaphone: Story = createIconStory('megaphone');
export const ListWithBackground: Story = createIconStory('listWithBackground');
export const Cross: Story = createIconStory('cross');
export const BurgerAndCross: Story = createIconStory('burgerAndCross');
export const Copy: Story = createIconStory('copy');
export const Watch: Story = createIconStory('watch');
export const Refresh: Story = createIconStory('refresh');

export const Check: Story = createIconStory('check', { color: 'green-750' });
export const CheckList: Story = createIconStory('checkList', { color: 'green-750' });
export const GraphUp: Story = createIconStory('graphUp', { color: 'green-750' });
export const Like: Story = createIconStory('like', { color: 'green-750' });
export const PlusCircle: Story = createIconStory('plusCircle', { color: 'green-750' });
export const CheckCircle: Story = createIconStory('checkCircle', { color: 'green-750' });
export const SealCheck: Story = createIconStory('sealCheck', { color: 'green-750' });
export const SealCheckOutlined: Story = createIconStory('sealCheckOutlined', {
	color: 'green-750',
});
export const TrendUp: Story = createIconStory('trendUp', { color: 'green-750' });
export const ThumbsUp: Story = createIconStory('thumbsUp', { color: 'green-750' });
export const TickWithBackground: Story = createIconStory('tickWithBackground', {
	color: 'green-750',
});
export const Whatsapp: Story = createIconStory('whatsapp', { color: 'green-750' });

export const CloseCircle: Story = createIconStory('closeCircle', { color: 'red-800' });
export const Trash: Story = createIconStory('trash', { color: 'red-800' });
export const Dislike: Story = createIconStory('dislike', { color: 'red-800' });
export const Youtube: Story = createIconStory('youtube', { color: 'red-800' });
export const YoutubeWithBackground: Story = createIconStory('youtubeWithBackground', {
	color: 'red-800',
});
export const Favorite: Story = createIconStory('favorite', { color: 'red-800' });
export const FavoriteRed: Story = createIconStory('favoriteRed', { color: 'red-800' });
export const ThumbsDown: Story = createIconStory('thumbsDown', { color: 'red-800' });

export const Warning: Story = createIconStory('warning', { color: 'yellow-800' });
export const Lamp: Story = createIconStory('lamp', { color: 'yellow-800' });

export const Info: Story = createIconStory('info', { color: 'purple-800' });
export const Instagram: Story = createIconStory('instagram', { color: 'purple-600' });
export const YeaHubCommunity: Story = createIconStory('yeaHubCommunity', { color: 'purple-800' });
export const LogoText: Story = createIconStory('logoText', { color: 'purple-800' });

export const GithubWhite: Story = createIconStory('githubWhite', { color: 'white-900' });
export const FigmaWhite: Story = createIconStory('figmaWhite', { color: 'white-900' });
