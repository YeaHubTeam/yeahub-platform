import {
	avito,
	ozon,
	sber,
	tbank,
	vk,
	wb,
	yandex,
} from '@/widgets/Landing/CollectionBlock/model/assets/miniatures';

type ImageItem = { src: string; alt: string };

export const filters: Record<string, ImageItem> = {
	sber: { src: sber, alt: 'Сбер' },
	tbank: { src: tbank, alt: 'Т-Банк' },
	yandex: { src: yandex, alt: 'Яндекс' },
	wb: { src: wb, alt: 'WB' },
	avito: { src: avito, alt: 'Авито' },
	ozon: { src: ozon, alt: 'Ozon' },
	vk: { src: vk, alt: 'VK' },
};

export const filtersList = Object.values(filters);

export const sliderSettings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 3,
	variableWidth: false,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 2,
				arrows: false,
				variableWidth: false,
			},
		},
	],
};
