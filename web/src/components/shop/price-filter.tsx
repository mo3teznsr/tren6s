import { CheckBox } from "@components/ui/checkbox";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "next-i18next";
import { siteSettings } from "@settings/site.settings";
const priceFilterItems = [
	{
		id: `1`,
		name: `Under ${siteSettings.currency} 50`,
		slug: `0-50`,
	},
	{
		id: `2`,
		name: `${siteSettings.currency}50 to ${siteSettings.currency}100`,
		slug: `50-100`,
	},
	{
		id: `3`,
		name: `${siteSettings.currency}100 to ${siteSettings.currency}150`,
		slug: `100-150`,
	},
	{
		id: `4`,
		name: `${siteSettings.currency}150 to ${siteSettings.currency}200`,
		slug: `150-200`,
	},
	{
		id: `5`,
		name: `${siteSettings.currency}200 to ${siteSettings.currency}300`,
		slug: `200-300`,
	},
	{
		id: `6`,
		name: `${siteSettings.currency}300 to ${siteSettings.currency}500`,
		slug: `300-500`,
	},
	{
		id: `7`,
		name: `${siteSettings.currency}500 to ${siteSettings.currency}1000`,
		slug: `500-1000`,
	},
	{
		id: `8`,
		name: `Over ${siteSettings.currency}1000`,
		slug: `1000+`,
	},
];

export const PriceFilter = () => {
	const { t } = useTranslation(`common`);
	const router = useRouter();
	const { pathname, query } = router;
	const selectedPrices = query?.price ? (query.price as string).split(`,`) : [];
	const [formState, setFormState] = React.useState<string[]>(selectedPrices);
	React.useEffect(() => {
		setFormState(selectedPrices);
	}, [query?.price]);
	function handleItemClick(e: React.FormEvent<HTMLInputElement>): void {
		const { value } = e.currentTarget;
		let currentFormState = formState.includes(value)
			? formState.filter((i) => i !== value)
			: [...formState, value];
		// setFormState(currentFormState);
		const { price, ...restQuery } = query;
		router.push(
			{
				pathname,
				query: {
					...restQuery,
					...(!!currentFormState.length
						? { price: currentFormState.join(`,`) }
						: {}),
				},
			},
			undefined,
			{ scroll: false }
		);
	}
	const items = priceFilterItems;

	return (
		<div className="block border-b border-gray-300 pb-7 mb-7">
			<h3 className="text-heading text-sm md:text-base font-semibold mb-7">
				{t(`text-price`)}
			</h3>
			<div className="mt-2 flex flex-col space-y-4">
				{items?.map((item: any) => (
					<CheckBox
						key={item.id}
						label={item.name}
						name={item.name.toLowerCase()}
						checked={formState.includes(item.slug)}
						value={item.slug}
						onChange={handleItemClick}
					/>
				))}
			</div>
		</div>
	);
};
