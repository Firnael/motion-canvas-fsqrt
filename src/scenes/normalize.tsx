import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, waitFor } from '@motion-canvas/core/lib/flow';
import { Grid, Latex, Node, Ray, Txt } from '@motion-canvas/2d/lib/components';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { easeInOutQuad, linear } from '@motion-canvas/core/lib/tweening';
import { createSignal } from '@motion-canvas/core/lib/signals';

export default makeScene2D(function* (view) {
	const rlw = 2;
	const tickWidth = 8;
	const repereSize = 250;
	const xColor = '#66ABE1';
	const yColor = '#9CC281';

	view.fill('#242424');

	const group = createRef<Node>();

	const grid = createRef<Grid>();

	const abs = createRef<Ray>();
	const ord = createRef<Ray>();
	const oneAbs = createRef<Ray>();
	const oneOrd = createRef<Ray>();

	const vector = createRef<Ray>();
	const x = createRef<Ray>();
	const y = createRef<Ray>();

	const mText = createRef<Txt>();
	const xText = createRef<Txt>();
	const yText = createRef<Txt>();

	const value = createSignal(0);

	const textStyle = {
		fontWeight: 500,
		fontSize: 50,
		offsetY: -1,
		padding: 20,
		cache: true
	};
	const smallTextStyle = {...textStyle};
	smallTextStyle.fontSize = 30;

	view.add(
		<Node ref={group}>
			<Grid
				ref={grid}
				width={300}
				height={300}
				spacing={50}
				lineWidth={2}
				scale={1.65}
				stroke={'#444'}
				lineCap="square"
			/>
			<Ray
				ref={abs}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-repereSize, repereSize)}
				to={new Vector2(repereSize, repereSize)}
				endArrow
				start={0}
				end={1}
			/>
			<Ray
				ref={ord}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-repereSize, repereSize)}
				to={new Vector2(-repereSize, -repereSize)}
				endArrow
				start={0}
				end={1}
			/>
			<Ray
				ref={oneAbs}
				lineWidth={tickWidth}
				stroke={'#aaa'}
				start={0}
				end={1}
				from={new Vector2(0, 240)}
				to={new Vector2(0, 260)}
			/>
			<Ray
				ref={oneOrd}
				lineWidth={tickWidth}
				stroke={'#aaa'}
				start={0}
				end={1}
				from={new Vector2(-240, 0)}
				to={new Vector2(-260, 0)}
			/>
			
			<Ray
				ref={vector}
				lineWidth={10}
				endArrow
				stroke={'#C878E1'}
				from={new Vector2(-250, 250)}
				to={new Vector2(50, -50)}
				start={0}
				end={1}
			/>

			<Ray
				ref={x}
				lineWidth={8}
				stroke={xColor}
				from={new Vector2(-repereSize, 250)}
				to={new Vector2(50, 250)}
				start={0}
				end={1}
			/>
			<Ray
				ref={y}
				lineWidth={8}
				stroke={yColor}
				from={new Vector2(-repereSize, repereSize)}
				to={new Vector2(-repereSize, -50)}
				start={0}
				end={1}
			/>

			<Txt ref={mText} text={() => value().toFixed(2).toString()} fill={'#C878E1'} x={50} y={0} opacity={1} {...textStyle} />
			<Txt ref={xText} text={() => Math.sqrt(value() / 2).toFixed(2).toString()} fill={xColor} x={50} y={repereSize} opacity={1} {...smallTextStyle} />
			<Txt ref={yText} text={() => Math.sqrt(value() / 2).toFixed(2).toString()} fill={yColor} x={-repereSize - 50} y={-80} opacity={1} {...smallTextStyle} />

		</Node>
	);

	yield group().position(0, 0);
	yield group().scale(1.2);
	yield value(2.5);
	yield* waitFor(1);

	// réduit
	yield* all(...[
		vector().to({ x: -50, y: 50 }, 2),
		x().to({ x: -50, y: 250 }, 2),
		y().to({ x: -250, y: 50 }, 2),
		mText().position({x: -50, y: 100}, 2),
		xText().x(-50, 2),
		yText().y(20, 2),
		value(1, 2, easeInOutQuad)
	]);

	yield* waitFor(1);

	// grandit
	yield* all(...[
		vector().to({ x: 50, y: -50 }, 2),
		x().to({ x: 50, y: 250 }, 2),
		y().to({ x: -repereSize, y: -50}, 2),
		mText().position({x: 50, y: 0}, 2),
		xText().x(50, 2),
		yText().y(-80, 2),
		value(2.5, 2, easeInOutQuad)
	]);
});
