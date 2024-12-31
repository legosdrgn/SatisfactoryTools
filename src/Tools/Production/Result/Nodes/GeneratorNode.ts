import {GraphNode} from '@src/Tools/Production/Result/Nodes/GraphNode';
import {IVisNode} from '@src/Tools/Production/Result/IVisNode';
import {IJsonSchema} from '@src/Schema/IJsonSchema';
import {ResourceAmount} from '@src/Tools/Production/Result/ResourceAmount';
import {GeneratorData} from '@src/Tools/Production/Result/GeneratorData';
import {Strings} from '@src/Utils/Strings';
import {Numbers} from '@src/Utils/Numbers';

export class GeneratorNode extends GraphNode
{

	public ingredients: ResourceAmount[] = [];
	public products: ResourceAmount[] = [];

	public constructor(public readonly generatorData: GeneratorData, data: IJsonSchema)
	{
		super();

		const time = generatorData.fuelItem.energyValue / generatorData.generator.powerProduction;

		const multiplier = this.getMultiplier();
		this.ingredients.push(new ResourceAmount(generatorData.fuelItem, multiplier, 0));

		if (generatorData.fuelRecipe.supplement) {
			const waterPerSecond = generatorData.generator.powerProduction * generatorData.generator.waterToPowerRatio / 1000.0;
			this.ingredients.push(new ResourceAmount(data.items[generatorData.fuelRecipe.supplement], waterPerSecond * time * multiplier, 0));
		}

		if (generatorData.fuelRecipe.byproduct && generatorData.fuelRecipe.amount) {
			this.products.push(new ResourceAmount(data.items[generatorData.fuelRecipe.byproduct], generatorData.fuelRecipe.amount * multiplier, generatorData.fuelRecipe.amount * multiplier));
		}
	}

	public getInputs(): ResourceAmount[]
	{
		return this.ingredients;
	}

	public getOutputs(): ResourceAmount[]
	{
		return this.products;
	}

	public getTitle(): string
	{
		return 'Power: ' + this.formatText(this.generatorData.fuelItem.name) + '\n' + Strings.formatNumber(this.generatorData.amount) + 'x ' + this.generatorData.machine.name;
	}

	public getTooltip(): string|null
	{
		const title: string[] = [];
		const power: number = this.generatorData.generator.powerProduction * this.generatorData.amount;
		title.push('Generates power: ' + Numbers.round(power) + ' MW');
		title.push('');

		for (const ingredient of this.ingredients) {
			title.push('<b>IN:</b> ' + Strings.formatNumber(ingredient.maxAmount) + ' / min - ' + ingredient.resource.name);
		}
		for (const product of this.products) {
			title.push('<b>OUT:</b> ' + Strings.formatNumber(product.maxAmount) + ' / min - ' + product.resource.name);
		}
		return title.join('<br>');
	}

	public getVisNode(): IVisNode
	{
		const el = document.createElement('div');
		el.innerHTML = this.getTooltip() || '';
		return {
			id: this.id,
			label: this.getTitle(),
			title: el as unknown as string,
			color: {
				border: 'rgba(0, 0, 0, 0)',
				background: 'rgb(118,26,223)',
				highlight: {
					border: 'rgba(238, 238, 238, 1)',
					background: 'rgb(82,49,231)',
				},
			},
			font: {
				color: 'rgba(238, 238, 238, 1)',
			},
		};
	}

	private getMultiplier(): number
	{
		return this.generatorData.amount * (this.generatorData.clockSpeed / 100) * (60 / (this.generatorData.fuelItem.energyValue / this.generatorData.generator.powerProduction));
	}

}
