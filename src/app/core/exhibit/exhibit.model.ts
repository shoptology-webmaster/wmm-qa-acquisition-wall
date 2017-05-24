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
	layout?: string;
	product?: string;
	fact?: string;
	name?: string;
	code?: string;
}

export const ExhibitsMock: Exhibit[] = [
	{
		name: 'Jet',
		color: '#733DE2',
		logo: 'assets/img/Jet.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#CB68FF',
				logo: 'assets/img/Jet.png',
				title: 'The biggest thing in shopping since ... shopping',
				desc: 'Jet.com is changing the way the world shops with innovative technology and a people-centric approach. Moving at the speed of a startup with access to unrivaled resources, the Jet.com team likes to say it’s the best of both worlds.',
				product: 'assets/img/jet/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/jet/2-image.jpg',
				fact: 'From furniture to electronics to food, Jet.com has it all.'
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/jet/3-image.png',
				fact: `
					<p>Average number of new Jet.com customers each month</p>
					<p class="big block accent">400,000</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/jet/4-image.png',
				layout: 'img-bottom',
				fact: `
					<p>Number of products<br> available on Jet.com</p>
					<p class="big block accent">12 million</p>
				`
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/jet/5-image.jpg',
				fact: `
					On launch day,
					Jet.com had
					<span class="accent">$1 million in sales.</span>
				`
			},
			{
				type: TextSlideComponent,
				logo: 'assets/img/Jet.png',
				product: 'assets/img/jet/text-product.png',
				name: 'Jet',
				code: 'JET'
			}
		]
	},
	{
		name: 'HayNeedle',
		color: '#37939B',
		logo: 'assets/img/Hayneedle.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#61EAF6',
				logo: 'assets/img/Hayneedle.png',
				title: 'Find everything home',
				desc: `
						Hayneedle is a leading online home furnishings
						and décor retailer that includes the world’s largest
						outdoor living selection. Hayneedle delivers millions
						of products and over 3,000 brands — including
						in-house brands that feature designer
						looks for a fraction of the cost.
				`,
				product: 'assets/img/hayneedle/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/hayneedle/2-image.jpg',
				fact: 'Furniture, décor, exclusive designs, and more for every space, style, and budget.'
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/hayneedle/3-image.png',
				fact: `
					<p>
						Hayneedle began in 2002 with
						the purchase of a single online store,
						Hammocks.com, from  a
					</p>
					<p class="big block accent">llama farmer.</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/hayneedle/4-image.png',
				fact: `
					<p>
						<span class="accent">
							Hayneedle has its own photography studio
						</span> and customer care
						center in Omaha, Nebraska, as well
						as state-of-the-art fulfillment
						centers in California and Ohio.
					</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/hayneedle/5-image.png',
				fact: `
					<p>
						Hayneedle employees consume over
						<span class="accent">4,000 cookies</span> and
						<span class="accent">5,000 daily bars</span> every year.
					</p>
				`
			},
			{
				type: TextSlideComponent,
				logo: 'assets/img/Hayneedle.png',
				product: 'assets/img/hayneedle/text-product.png',
				name: 'Hayneedle',
				code: 'HAYNEEDLE'
			}
		]
	},
	{
		name: 'Modcloth',
		color: '#9F7A41',
		logo: 'assets/img/ModCloth.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#E0BF90',
				logo: 'assets/img/ModCloth.png',
				title: 'Democratizing fashion one dress at a time',
				desc: `
						ModCloth is the fun, friendly spot for
						style and decor that’s as expressive
						and unique as you are! Inspired by
						feedback from the community, their
						exclusive line of apparel is available
						in a full range of sizes ― because
						ModCloth believes fashion is for every body.
				`,
				product: 'assets/img/modcloth/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/modcloth/2-image.jpg',
				fact: 'ModCloth carries a curated selection of styles from hundreds of independent designers.'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/modcloth/3-image.jpg',
				fact: `
					<img src="assets/img/modcloth/3-image-2.png" class="smaller">
					<br>
					<br>
					ModCloth’s #1 internal search term is "cats." They have
					<span class="accent">more than 100 cat-themed styles</span> on
					the site.
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/modcloth/4-image.png',
				fact: `
					<p>
						At ModCloth, <span class="accent">the founder’s dog’s birthday</span> is a company holiday!
					</p>
				`
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/modcloth/5-image.jpg',
				fact: `
					Founded in a <span class="accent">college dorm
					room</span> by high school
					sweethearts Susan Gregg Koger and Eric Koger in
					2002, ModCloth has since grown to over 350
					employees across offices in San Francisco,
					Los Angeles, and Pittsburgh.
				`
			},
			{
				type: TextSlideComponent,
				logo: 'assets/img/ModCloth.png',
				product: 'assets/img/modcloth/text-product.png',
				name: 'ModCloth',
				code: 'MODCLOTH'
			}
		]
	},
	{
		name: 'Moosejaw',
		color: '#9A0000',
		logo: 'assets/img/Moosejaw.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#FFA900',
				logo: 'assets/img/Moosejaw.png',
				title: 'Love the madness',
				desc: `
						Moosejaw is a leading online retailer
						for active outdoor products with 10
						physical stores. Moosejaw carries
						more than 400 brands including Patagonia,
						The North Face, Marmot, Arc’teryx, and more.
				`,
				product: 'assets/img/moosejaw/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/moosejaw/2-image.jpg',
				fact: 'Apparel and gear for climbing, hiking, camping, snow sports, yoga, swimming, and biking.'
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/moosejaw/3-image.png',
				fact: `
					<p>
						The name of the company was developed by <span class="accent">throwing a
						dart at a map</span> and using the name of the city it
						landed on. Shout-out to <span class="accent">Moose Jaw, Canada.</span>
					</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/moosejaw/4-image.png',
				fact: `
					<p>
						The brand's focus is having fun and being friends
						with customers. <span class="accent">Random games of hide-and-seek
						and touch football are known to happen</span> in
						the middle of its stores.
					</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/moosejaw/5-image.png',
				fact: `
					<p>
						 The company has developed a nontraditional marketing
						 approach called <span class="accent">"Moosejaw Madness."</span> The
						 company influences customer purchases
						 and loyalty by <span class="accent">adding humor to all their
						 communications.</span>
					</p>
				`
			},
			{
				type: TextSlideComponent,
				logo: 'assets/img/Moosejaw.png',
				product: 'assets/img/moosejaw/text-product.png',
				name: 'Moosejaw',
				code: 'MOOSEJAW'
			}
		]
	},
	{
		name: 'Shoes',
		color: '#253B8D',
		logo: 'assets/img/Shoes.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#9BB7FF',
				logo: 'assets/img/Shoes.png',
				title: 'World\'s largest site for shoes',
				desc: `
						Shoes.com is the online shopping destination
						for women, men, and kids — making it easy,
						fun, and affordable to find the shoes you
						love. Dedicated to each customer’s journey,
						Shoes.com works to provide a great
						selection and seamless shoe-shopping
						experience every day.
				`,
				product: 'assets/img/shoes/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/shoes/2-image.jpg',
				fact: 'Shoes, shoes, and more shoes for every occasion.'
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/shoes/3-image.png',
				fact: `
					<p>
						Shoes.com's social channels have an
						organic engagement, drawing in
						<span class="accent">281k Facebook</span> followers and <span class="accent">148k
						Instagram followers</span> — more than double
						those of Zappos!
					</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/shoes/4-image.png',
				fact: `
					<p>
						Shoes.com was founded in 1999 in Boston,
						Massachusetts, using the site address
						shoebuy.com. It was one of the <span class="accent">first
						companies to sell shoes online.</span>
					</p>
				`
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/shoes/5-image.jpg',
				fact: `
					Shoes.com carries
					<span class="accent">more than 800 brands</span>
					and over a million items including
					footwear for women, men, and kids,
					as well as clothing and accessories
					such as outerwear and handbags.
				`
			},
			{
				type: TextSlideComponent,
				logo: 'assets/img/Shoes.png',
				product: 'assets/img/shoes/text-product.png',
				name: 'Shoes',
				code: 'SHOES'
			}
		]
	},
	{
		name: 'Walmart',
		color: '#0284C5',
		logo: 'assets/img/Walmart.png',
		slides: [
			{
				type: ProductSlideComponent,
				accent: '#FFC31C',
				logo: 'assets/img/Walmart.png',
				title: 'Save money. Live better.',
				desc: `
						Walmart.com is a lot like your
						neighborhood Walmart store. It
						features a great selection of
						high-quality merchandise, friendly
						service, and of course, Every Day
						Low Prices. There's also another goal:
						to bring you the best shopping experience
						on the Internet.
				`,
				product: 'assets/img/walmart/product-shot.png'
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/walmart/2-image.jpg',
				fact: `
					Save on millions of items in Baby, Pets, Food,
					Household Essentials, Health, Clothing, Beauty, and more.
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/walmart/3-image.png',
				fact: `
					<p>
						<span class="accent">Walmart.com started in late 1995 as a
						simple home page.</span> Customers could view job
						openings and circulars and also read about the history of Walmart.
					</p>
				`
			},
			{
				type: FactTopSlideComponent,
				img: 'assets/img/walmart/4-image.png',
				fact: `
					<p>
						The early staff of Walmart.com were employees
						of a hardware/home DIY site that Walmart
						acquired. <span class="accent">Its CMS for displaying product
						items was called “the tool,”</span> morphing over
						the years to suit the needs of Walmart.com.
					</p>
				`
			},
			{
				type: FactBottomSlideComponent,
				img: 'assets/img/walmart/5-image.jpg',
				fact: `
					Walmart.com has always called Silicon
					Valley home. Before moving to San Bruno,
					California, from the neighboring city
					of Brisbane, Walmart.com occupied a
					building <span class="accent">affectionately
					nicknamed the Love Boat.</span>
				`
			},
			{
				type: TextSlideComponent,
				logo: 'assets/img/Walmart.png',
				product: 'assets/img/walmart/text-product.png',
				name: 'Walmart',
				code: 'DOTCOM'
			}
		]
	}
];
