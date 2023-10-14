import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Circle, CubicBezier, Grid, Latex, Line, Node, Ray, Txt } from '@motion-canvas/2d/lib/components';
import { easeInOutCubic } from '@motion-canvas/core/lib/tweening';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { all, waitFor } from '@motion-canvas/core/lib/flow';

/**
 * https://www.desmos.com/calculator/hx32lzukws
 */
export default makeScene2D(function* (view) {
	view.fill('#242424'); // set the background of this scene

	const linearColor = '#89AAE4';
	const logColor = '#9CC281';

	const textStyle = {
		fontFamily: 'Gill Sans',
		fontSize: 56,
		offsetY: -1,
		padding: 20,
		fill: '#ccc',
		cache: true
	};

	const globalGroup = createRef<Node>();
	const axesGroup = createRef<Node>();

	const grid = createRef<Grid>();
	const xAxis = createRef<Ray>();
	const yAxis = createRef<Ray>();
	const oneAbscissa = createRef<Ray>();

	const bezier = createRef<CubicBezier>();
	const line = createRef<Line>();

	const xText = createRef<Txt>();
	const yText = createRef<Txt>();
	const linearTex = createRef<Latex>();
	const logTex = createRef<Latex>();

	const dotZero = createRef<Circle>();
	const dotOne = createRef<Circle>();

	view.add(
		<Node ref={globalGroup}>
			<Grid
				ref={grid}
				width={600}
				height={600}
				spacing={50}
				lineWidth={2}
				scale={0}
				stroke={'#444'}
				lineCap="square"
			/>
			<Node ref={axesGroup} x={-300} y={300}>
				<Ray
					ref={xAxis}
					lineWidth={6}
					// endArrow
					stroke={'#aaa'}
					start={0}
					end={0}
					from={new Vector2(-30, 0)}
					to={new Vector2(630, 0)}
				/>
				<Ray
					ref={yAxis}
					lineWidth={6}
					// endArrow
					stroke={'#aaa'}
					start={0}
					end={0}
					from={new Vector2(0, 30)}
					to={new Vector2(0, -630)}
				/>
				<Ray
					ref={oneAbscissa}
					lineWidth={6}
					stroke={'#aaa'}
					start={0}
					end={0}
					from={new Vector2(600, -30)}
					to={new Vector2(600, 30)}
				/>
				<Line
					ref={line}
					lineWidth={4}
					stroke={linearColor}
					start={0}
					end={0}
					points={[
						[-50, 50],
						[650, -650]
					]}
					lineCap={'round'}
				/>
				<CubicBezier
					ref={bezier}
					lineWidth={4}
					stroke={logColor}
					p0={[-50, 70]}
					p1={[200, -300]}
					p2={[400, -450]}
					p3={[650, -637]}
					end={0}
				/>
				<Txt ref={xText} text={'0'} x={0} y={20} opacity={0} {...textStyle} />
				<Txt ref={yText} text={'1'} x={600} y={20} opacity={0} {...textStyle} />
				<Latex ref={linearTex} tex="\textcolor{#89AAE4}{f(x) = x}" x={850} y={-350} opacity={0} width={400} />
				<Latex
					ref={logTex}
					tex="\textcolor{#9CC281}{f(x) = \log_2(1+x)}"
					x={950}
					y={-250}
					opacity={0}
					width={600}
				/>
				<Circle ref={dotZero} x={600} y={-600} width={20} height={20} fill="#fff" opacity={0} />,
				<Circle ref={dotOne} x={0} y={0} width={20} height={20} fill="fff" opacity={0} />,
			</Node>
		</Node>
	);

	yield globalGroup().position(-300, 150);
	yield* grid().scale(1, 0.5, easeInOutCubic);

	yield* all(...[xAxis().start(1, 0.5, easeInOutCubic), yAxis().start(1, 0.5, easeInOutCubic)]);

	yield* all(
		...[
			xText().opacity(1, 0.5, easeInOutCubic),
			yText().opacity(1, 0.5, easeInOutCubic),
			oneAbscissa().start(1, 0, easeInOutCubic)
		]
	);

	yield* line().end(1, 1);
	yield* linearTex().opacity(1, 0.3, easeInOutCubic);

	yield* waitFor(1);

	yield* all(
		...[bezier().end(1, 1), dotZero().opacity(1, 0.3, easeInOutCubic), dotOne().opacity(1, 0.3, easeInOutCubic)]
	);
	yield* logTex().opacity(1, 0.3, easeInOutCubic);
});
