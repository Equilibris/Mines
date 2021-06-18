export class Point {
	x: i32
	y: i32
}

export const randomPoint = (bottom: Point, top: Point): Point => ({
	x: Math.round(bottom.x + Math.random() * (top.x - bottom.x)) as i32,
	y: Math.round(bottom.y + Math.random() * (top.y - bottom.y)) as i32,
})
