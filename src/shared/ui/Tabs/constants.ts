export const tabsTestIds = {
	tabs: 'Tabs',
	list: 'Tabs_List',
	item: (tab: string) => `Tabs_Item_${tab}` as const,
};
