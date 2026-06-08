export const createSlug = (text: string): string => {
	let slug = text.toLowerCase();

	const cyrillicToLatin: Record<string, string> = {
		а: 'a',
		б: 'b',
		в: 'v',
		г: 'g',
		д: 'd',
		е: 'e',
		ё: 'yo',
		ж: 'zh',
		з: 'z',
		и: 'i',
		й: 'y',
		к: 'k',
		л: 'l',
		м: 'm',
		н: 'n',
		о: 'o',
		п: 'p',
		р: 'r',
		с: 's',
		т: 't',
		у: 'u',
		ф: 'f',
		х: 'h',
		ц: 'c',
		ч: 'ch',
		ш: 'sh',
		щ: 'shch',
		ъ: '',
		ы: 'y',
		ь: '',
		э: 'e',
		ю: 'yu',
		я: 'ya',
	};
	slug = slug.replace(/[а-яё]/gi, (match) => cyrillicToLatin[match] || '');
	slug = slug.replace(/[^a-z0-9\s]/g, '');
	slug = slug.replace(/\s+/g, '-');
	slug = slug.replace(/-+/g, '-').replace(/^-|-$/g, '');

	return slug;
};
