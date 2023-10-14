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
	const deltaXColor = '#C878E1';
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
	const deltaXLine = createRef<Line>();
	const fxTex = createRef<Latex>();
	const fxPrimeTex = createRef<Latex>();
	const xDeltaTex = createRef<Latex>();

	view.add(
		<Node ref={globalGroup}>
			<Grid
				ref={grid}
				width={1100}
				height={700}
				spacing={50}
				lineWidth={2}
				scale={1}
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
					end={1}
					from={new Vector2(-100, 0)}
					to={new Vector2(900, 0)}
				/>
				<Ray
					ref={yAxis}
					lineWidth={6}
					endArrow
					stroke={'#aaa'}
					start={0}
					end={1}
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
					end={1}
				/>

				<Latex ref={x1Tex} tex="\textcolor{#DCBD87}{x_1}" x={750} y={40} width={50} opacity={1} />
				<Latex ref={x2Tex} tex="\textcolor{#9CC281}{x_2}" x={420} y={40} width={50} opacity={1} />
				<Latex ref={fxTex} tex="\textcolor{#CCCCCC}{f(x_1)}" x={820} y={-150} width={100} opacity={0} />
				<Latex ref={fxPrimeTex} tex="\textcolor{#9CC281}{f'(x_1)}" x={850} y={-350} width={100} opacity={0} />
				<Latex ref={xDeltaTex} tex="\textcolor{#C878E1}{\Delta_x}" x={600} y={50} width={100} opacity={0} />

				<Line
					ref={x1}
					lineWidth={12}
					stroke={x1Color}
					start={0}
					end={1}
					points={[
						[750, 5],
						[750, -5]
					]}
					opacity={1}
					lineCap={'round'}
				/>
				<Line
					ref={x1Line}
					lineWidth={4}
					stroke={lineColor}
					start={0}
					end={1}
					points={[
						[750, 0],
						[750, -350]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={1}
				/>
				<Line
					ref={x1Tangent}
					lineWidth={4}
					stroke={x2Color}
					start={0}
					end={1}
					points={[
						[850, -455],
						[400, 20]
					]}
					lineCap={'round'}
					lineDash={[10, 10]}
					opacity={1}
				/>

				<Line
					ref={x2}
					lineWidth={12}
					stroke={x2Color}
					start={0}
					end={1}
					points={[
						[420, 5],
						[420, -5]
					]}
					opacity={1}
					lineCap={'round'}
				/>

				<Line
					ref={deltaXLine}
					lineWidth={6}
					stroke={deltaXColor}
					start={0}
					end={1}
					points={[
						[425, 0],
						[745, 0]
					]}
					opacity={0}
					lineCap={'round'}
				/>
			</Node>
		</Node>
	);

	yield grid();
	yield xAxis();
	yield yAxis();
	yield bezier();

	yield x1();
	yield x1Tex();
	yield x1Line();
	yield x1Tangent();
	yield x2();
	yield x2Tex();

	yield* waitFor(1);

	yield* all(...[
		globalGroup().position.x(-500, 1, easeInOutCubic),
		globalGroup().position.y(-50, 1, easeInOutCubic),
		globalGroup().scale(2, 1, easeInOutCubic)
	]);

	yield* fxTex().opacity(1, 1, easeInOutCubic);
	yield* fxPrimeTex().opacity(1, 1, easeInOutCubic);

	yield* waitFor(1);

	yield* fxTex().opacity(0, 0.5, easeInOutCubic);
	yield fxTex().tex("\\textcolor{#DCBD87}{\\Delta_y}");

	yield* all(...[
		x1Line().lineDash([10, 0], 0.5, easeInOutCubic),
		x1Line().stroke(x1Color, 0.5, easeInOutCubic),
		fxTex().opacity(1, 0.5, easeInOutCubic),
	]);

	yield* all(...[
		deltaXLine().opacity(1, 0.5, easeInOutCubic),
		xDeltaTex().opacity(1, 1, easeInOutCubic),
	]);
	
	yield* fxPrimeTex().opacity(0, 0.5, easeInOutCubic);
	yield fxPrimeTex().tex("\\textcolor{#9CC281}{\\frac{\\Delta_y}{\\Delta_x}}");
	yield* fxPrimeTex().opacity(1, 0.5, easeInOutCubic);

	
});
