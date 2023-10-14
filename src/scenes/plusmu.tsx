import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Circle, CubicBezier, Grid, Latex, Line, Node, Ray, Txt } from '@motion-canvas/2d/lib/components';
import { easeInOutCubic } from '@motion-canvas/core/lib/tweening';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { all, waitFor } from '@motion-canvas/core/lib/flow';

/**
 * https://www.desmos.com/calculator/vizhnjk7ag
 */
export default makeScene2D(function* (view) {
	view.fill('#242424'); // set the background of this scene

	const linearColor = '#89AAE4';
	const logColor = '#9CC281';
	const muColor = '#C8A96F';

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

	const line = createRef<Line>();

	const almostEqualTex = createRef<Latex>();
	const almostEqualMuTex = createRef<Latex>();
	const muText = createRef<Txt>();

	view.add(
		<Node ref={globalGroup}>
			<Grid width={600} height={600} spacing={50} lineWidth={2} stroke={'#444'} lineCap="square" />
			<Node ref={axesGroup} x={-300} y={300}>
				<Ray
					lineWidth={6}
					stroke={'#aaa'}
					start={0}
					end={1}
					from={new Vector2(-30, 0)}
					to={new Vector2(630, 0)}
				/>
				<Ray
					lineWidth={6}
					stroke={'#aaa'}
					start={0}
					end={1}
					from={new Vector2(0, 30)}
					to={new Vector2(0, -630)}
				/>
				<Ray
					lineWidth={6}
					stroke={'#aaa'}
					start={0}
					end={1}
					from={new Vector2(600, -30)}
					to={new Vector2(600, 30)}
				/>
				<Line
					ref={line}
					lineWidth={4}
					stroke={linearColor}
					start={0}
					end={1}
					points={[
						[-50, 50],
						[650, -650]
					]}
					lineCap={'round'}
				/>
				<CubicBezier
					lineWidth={4}
					stroke={logColor}
					p0={[-50, 70]}
					p1={[200, -300]}
					p2={[400, -450]}
					p3={[650, -637]}
					end={1}
				/>
				<Txt text={'0'} x={0} y={20} {...textStyle} />
				<Txt text={'1'} x={600} y={20} {...textStyle} />
				<Latex
					ref={almostEqualTex}
					tex="\textcolor{#9CC281}{\log_2(1+x)}\textcolor{#DDDDDD}{\approx}\textcolor{#89AAE4}{x}"
					x={-300}
					y={-400}
					width={500}
				/>
				<Latex
					ref={almostEqualMuTex}
					tex="\textcolor{#9CC281}{\log_2(1+x)}\textcolor{#DDDDDD}{\approx}\textcolor{#89AAE4}{x}\textcolor{#DDDDDD}{ + }\textcolor{#C8A96F}{\mu}"
					x={-300}
					y={-400}
					opacity={0}
					width={400}
				/>
				<Txt
					ref={muText}
					text={"µ = 0.0000"}
					x={-300}
					y={-300}
					opacity={0}
					{ ...textStyle }
					fill={muColor}
				/>

				<Circle x={600} y={-600} width={20} height={20} fill="#fff" />,
				<Circle x={0} y={0} width={20} height={20} fill="fff" />,
			</Node>
		</Node>
	);

	yield* waitFor(1);
	yield* almostEqualTex().opacity(1, 0.3, easeInOutCubic);
	yield* waitFor(1);
	yield* all(...[
		almostEqualTex().opacity(0, 0.3, easeInOutCubic),
		almostEqualMuTex().opacity(1, 0.3, easeInOutCubic),
		almostEqualMuTex().width(500, 0.3, easeInOutCubic),
	]);

	yield* waitFor(1);
	yield* muText().opacity(1, 0.3, easeInOutCubic);

	yield* waitFor(1);
	yield* all(...[
		line().y(-30, 1, easeInOutCubic),
		line().stroke(muColor, 1, easeInOutCubic),
		muText().text("µ = 0.0430", 1, easeInOutCubic)
	]);
});
