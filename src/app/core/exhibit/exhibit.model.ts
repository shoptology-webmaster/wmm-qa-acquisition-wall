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
	type: string;
	img: string;
}

export const ExhibitsMock: Exhibit[] = [
	{
		name: 'Jet',
		color: '#733DE2',
		logo: '/assets/img/logo_jet.png',
		slides: [
			{
				type: '',
				img: '/assets/img/mocks/Jet/Interact - slide 2.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Jet/Interact - slide 3.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Jet/Interact - slide 4.jpg'
			},
			{
				type: '',
				img: '/assets/img/mocks/Jet/Interact - slide 5.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Jet/Interact - slide 6.jpg'
			}
			,{
				type: '',
				img: '/assets/img/mocks/Jet/Interact - slide 7.jpg'
			}
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
