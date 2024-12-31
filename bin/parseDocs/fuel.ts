import {IFuelSchema} from "@src/Schema/IFuelSchema";

export default function parseFuels(fuels: {
	mFuelClass: string,
	mSupplementalResourceClass: string,
	mByproduct: string,
	mByproductAmount: string
}[]): IFuelSchema[]
{
	const result: IFuelSchema[] = [];
	if (fuels) {
		for (const fuel of fuels) {
			result.push({
				fuel: fuel.mFuelClass,
				supplement: fuel.mSupplementalResourceClass || null,
				byproduct: fuel.mByproduct || null,
				amount: fuel.mByproductAmount ? parseInt(fuel.mByproductAmount) : null
			})
		}
	}
	return result;
}
