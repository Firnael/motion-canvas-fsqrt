import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { CubicBezier, Grid, Latex, Line, Node, Ray, Txt } from '@motion-canvas/2d/lib/components';
import { easeInOutCubic } from '@motion-canvas/core/lib/tweening';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { all, waitFor } from '@motion-canvas/core/lib/flow';

export default makeScene2D(function* (view) {
	view.fill('#242424'); // set the background of this scene

	const x1Color = '#DCBD87';
	const x2Color = '#9CC281';
	const x3Color = '#66ABE1';
	const x4Color = '#C878E1';
	const lineColor = '#cccccc';

	const globalGroup = createRef<Node>();
	const axesGroup = createRef<Node>();

	const grid = createRef<Grid>();
	const xAxis = createRef<Ray>();
	const yAxis = createRef<Ray>();
	const bezier = createRef<CubicBezier>();

	const x1Tex = createRef<Latex>();
	const x1 = createRef<Line>();
	const x1Line = createRef<Line>();
	const x1Tangent = createRef<Line>();
	const x2Tex = createRef<Latex>();
	const x2 = createRef<Line>();
	const x2Line = createRef<Line>();
	const x2Tangent = createRef<Line>();
	const x3Tex = createRef<Latex>();
	const x3 = createRef<Line>();
	const x3Line = createRef<Line>();
	const x3Tangent = createRef<Line>();
	const x4Tex = createRef<Latex>();
	const x4 = createRef<Line>();

	view.add(
		<Node ref={globalGroup}>
			<Grid
				ref={grid}
				width={1100}
				height={700}
				spacing={50}
				lineWidth={2}
				scale={0}
				stroke={'#444'}
				lineCap="square"
			/>
			<Node ref={axesGroup} x={-400} y={200}>
				<Ray
					ref={xAxis}
					lineWidth={6}
					endArrow
					stroke={'#aaa'}
					start={0}
					end={0}
					from={new Vector2(-100, 0)}
					to={new Vector2(900, 0)}
				/>
				<Ray
					ref={yAxis}
					lineWidth={6}
					endArrow
					stroke={'#aaa'}
					start={0}
					end={0}
					from={new Vector2(0, 100)}
					to={new Vector2(0, -500)}
				/>
				<CubicBezier
					ref={bezier}
					lineWidth={6}
					stroke={'white'}
					p0={[50, 20]}
					p1={[400, 0]}
					p2={[800, -350]}
					p3={[850, -500]}
					end={0}
				/>

				<Latex ref={x1Tex} tex="\textcolor{#DCBD87}{x_1}" x={750} y={40} width={50} opacity={0} />
				<Latex ref={x2Tex} tex="\textcolor{#9CC281}{x_2}" x={420} y={40} width={50} opacity={0} />
				<Latex ref={x3Tex} tex="\textcolor{#66ABE1}{x_3}" x={250} y={40} width={50} opacity={0} />
				<Latex ref={x4Tex} tex="\textcolor{#C878E1}{x_4}" x={175} y={40} width={50} opacity={0} />

				<Line
					ref={x1}
					lineWidth={12}
					stroke={x1Color}
					start={0}
					end={0}
					points={[
						[750, 5],
						[750, -5]
					]}
					opacity={0}
					lineCap={'round'}
				/>
				<Line
					ref={x1Line}
					lineWidth={4}
					stroke={lineColor}
					start={0}
					end={0}
					points={[
						[750, 0],
						[750, -350]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={0}
				/>
				<Line
					ref={x1Tangent}
					lineWidth={4}
					stroke={x2Color}
					start={0}
					end={0}
					points={[
						[920, -530],
						[400, 20]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={0}
				/>

				<Line
					ref={x2}
					lineWidth={12}
					stroke={x2Color}
					start={0}
					end={0}
					points={[
						[420, 5],
						[420, -5]
					]}
					opacity={0}
					lineCap={'round'}
				/>
				<Line
					ref={x2Line}
					lineWidth={4}
					stroke={lineColor}
					start={0}
					end={0}
					points={[
						[420, 0],
						[420, -96]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={0}
				/>
				<Line
					ref={x2Tangent}
					lineWidth={4}
					stroke={x3Color}
					start={0}
					end={0}
					points={[
						[720, -274],
						[220, 20]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={0}
				/>

				<Line
					ref={x3}
					lineWidth={12}
					stroke={x3Color}
					start={0}
					end={0}
					points={[
						[250, 5],
						[250, -5]
					]}
					opacity={0}
					lineCap={'round'}
				/>
				<Line
					ref={x3Line}
					lineWidth={4}
					stroke={lineColor}
					start={0}
					end={0}
					points={[
						[250, 0],
						[250, -20]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={0}
				/>
				<Line
					ref={x3Tangent}
					lineWidth={4}
					stroke={x4Color}
					start={0}
					end={0}
					points={[
						[350, -50],
						[50, 38]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={0}
				/>

				<Line
					ref={x4}
					lineWidth={12}
					stroke={x4Color}
					start={0}
					end={0}
					points={[
						[175, 5],
						[175, -5]
					]}
					opacity={0}
					lineCap={'round'}
				/>
			</Node>
		</Node>
	);

	yield* waitFor(1);

	yield* grid().scale(1, 0.5, easeInOutCubic);
	yield* xAxis().start(1, 0.5, easeInOutCubic);
	yield* yAxis().start(1, 0.5, easeInOutCubic);
	yield* bezier().end(1, 1);

	yield* all(...[x1().end(1, 1), x1().opacity(1, 1), x1Tex().opacity(1, 1)]);

	yield* waitFor(1);

	yield* all(...[x1Line().end(1, 1), x1Line().opacity(1, 0.1)]);
	yield* all(...[x1Tangent().end(1, 1), x1Tangent().opacity(1, 0.1)]);

	yield* all(...[x2().end(1, 1), x2().opacity(1, 1), x2Tex().opacity(1, 1)]);
	yield* x1Tangent().opacity(0, 0.5);

	yield* all(...[x2Line().end(1, 1), x2Line().opacity(1, 0.1)]);
	yield* all(...[x2Tangent().end(1, 1), x2Tangent().opacity(1, 0.1)]);

	yield* all(...[x3().end(1, 1), x3().opacity(1, 1), x3Tex().opacity(1, 1)]);
	yield* x2Tangent().opacity(0, 0.5);

	yield* all(...[x3Line().end(1, 1), x3Line().opacity(1, 0.1)]);
	yield* all(...[x3Tangent().end(1, 1), x3Tangent().opacity(1, 0.1)]);

	yield* all(...[x4().end(1, 1), x4().opacity(1, 1), x4Tex().opacity(1, 1)]);
	yield* x3Tangent().opacity(0, 0.5);
});
