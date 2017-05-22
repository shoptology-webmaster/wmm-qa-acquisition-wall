import { TextSlideComponent } from './../../shared/slides/text-slide.component';
import { FactTopSlideComponent } from './../../shared/slides/fact-top-slide.component';
import { FactBottomSlideComponent } from './../../shared/slides/fact-bottom-slide.component';
import { ProductSlideComponent } from './../../shared/slides/product-slide.component';

export interface ExhibitState {
	exhibits: Exhibit[]
}

export interface Exhibit {
	name: string;
	logo: string;
	color?: string;
	slides: Slide[]
}

export interface Slide {
	type: any;
	img?: string;
	color?: string;
	accent?: string;
	logo?: string;
	title?: string;
	desc?: string;
	product?: string;
	fact?: string;
}

export const ExhibitsMock: Exhibit[] = [
	{
		name: 'Jet',
		color: '#733DE2',
		logo: '/assets/img/logo_jet.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#CB68FF',
				logo: '/assets/img/logo_jet.png',
				title: 'The biggest thing in shopping since ... shopping',
				desc: 'Jet.com is changing the way the world shops with innovative technology and a people-centric approach. Moving at the speed of a startup with access to unrivaled resources, the Jet.com team likes to say it’s the best of both worlds.',
				product: '/assets/img/jet/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: '/assets/img/jet/2-image.jpg',
				fact: 'From furniture to electronics to food, Jet.com has it all.'
			},
			{
				type: FactTopSlideComponent,
				img: '/assets/img/jet/3-image.jpg',
				fact: `
					<p>Average number of new Jet.com customers each month</p>
					<p class="big block accent">400,000</p>
				`
			},
			{
				type: TextSlideComponent,
				logo: '/assets/img/logo_jet.png',
				product: '/assets/img/jet/text-product.png'
			}
			// {
			// 	type: '',
			// 	img: '/assets/img/mocks/Jet/Interact - slide 3.jpg'
			// },
			// {
			// 	type: '',
			// 	img: '/assets/img/mocks/Jet/Interact - slide 4.jpg'
			// },
			// {
			// 	type: '',
			// 	img: '/assets/img/mocks/Jet/Interact - slide 5.jpg'
			// }
			// ,{
			// 	type: '',
			// 	img: '/assets/img/mocks/Jet/Interact - slide 6.jpg'
			// }
			// ,{
			// 	type: '',
			// 	img: '/assets/img/mocks/Jet/Interact - slide 7.jpg'
			// }
		]
	},
	{
		name: 'Bonobos',
		color: '#FFFFFF',
		logo: '/assets/img/logo_bonobos.png',
		slides: [
			{
				type: '',
				img: '/assets/img/mocks/Bonobos/Interact - slide 2.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Bonobos/Interact - slide 3.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Bonobos/Interact - slide 4.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Bonobos/Interact - slide 5.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Bonobos/Interact - slide 6.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Bonobos/Interact - slide 7.jpg'
			}
		]
	},
	{
		name: 'HeyNeedle',
		color: '#FFFFFF',
		logo: '/assets/img/logo_heyneedle.png',
		slides: [
			{
				type: '',
				img: '/assets/img/mocks/HeyNeedle/Interact - slide 2.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/HeyNeedle/Interact - slide 3.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/HeyNeedle/Interact - slide 4.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/HeyNeedle/Interact - slide 5.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/HeyNeedle/Interact - slide 6.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/HeyNeedle/Interact - slide 7.jpg'
			}
		]
	},
	{
		name: 'Modcloth',
		color: '#FFFFFF',
		logo: '/assets/img/logo_modcloth.png',
		slides: [
			{
				type: '',
				img: '/assets/img/mocks/Modcloth/Interact - slide 2.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Modcloth/Interact - slide 3.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Modcloth/Interact - slide 4.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Modcloth/Interact - slide 5.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Modcloth/Interact - slide 6.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Modcloth/Interact - slide 7.jpg'
			}
		]
	},
	{
		name: 'Moosejaw',
		color: '#9A0000',
		logo: '/assets/img/logo_moosejaw.png',
		slides: [
			{
				type: '',
				img: '/assets/img/mocks/Moosejaw/Interact - slide 2.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Moosejaw/Interact - slide 3.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Moosejaw/Interact - slide 4.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Moosejaw/Interact - slide 5.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Moosejaw/Interact - slide 6.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Moosejaw/Interact - slide 7.jpg'
			}
		]
	},
	{
		name: 'Shoebuy',
		color: '#0042A8',
		logo: '/assets/img/logo_shoebuy.png',
		slides: [
			{
				type: '',
				img: '/assets/img/mocks/Shoebuy/Interact - slide 2.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Shoebuy/Interact - slide 3.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Shoebuy/Interact - slide 4.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Shoebuy/Interact - slide 5.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Shoebuy/Interact - slide 6.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Shoebuy/Interact - slide 7.jpg'
			}
		]
	}
];
