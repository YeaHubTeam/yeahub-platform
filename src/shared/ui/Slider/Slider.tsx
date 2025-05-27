import { ReactNode } from 'react';
import SlickSlider, { Settings } from 'react-slick';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const baseSliderSettings = {
	dots: false,
	infinite: true,
	arrows: false,
	speed: 300,
	variableWidth: true,
};

interface SliderProps extends Settings {
	children: ReactNode;
}

export const Slider = ({ children, ...customSliderSettings }: SliderProps) => {
	const sliderSettings = { ...baseSliderSettings, ...customSliderSettings };

	return <SlickSlider {...sliderSettings}>{children}</SlickSlider>;
};
