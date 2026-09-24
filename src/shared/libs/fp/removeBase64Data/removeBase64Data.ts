export function removeBase64Data(imageBase64: string) {
	const base64regexp = new RegExp(/data:image\/(png|jpg|jpeg);base64,/);
	return imageBase64.replace(base64regexp, '');
}

export function addBase64Data(imageBase64?: string | null) {
	if (!imageBase64) return null;

	if (/^(data:image\/|https?:\/\/|blob:)/.test(imageBase64)) {
		return imageBase64;
	}

	const imageType = imageBase64.startsWith('/9j/') ? 'jpeg' : 'png';

	return `data:image/${imageType};base64,${imageBase64}`;
}
