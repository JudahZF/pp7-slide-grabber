interface Color {
	red: number
	green: number
	blue: number
}

export interface Group {
	name: string
	color: Color
	slides: Slide[]
}

interface Size {
	width: number
	height: number
}

interface Slide {
	enabled: boolean
	notes: string
	text: string
	label: string
	size: Size
}
