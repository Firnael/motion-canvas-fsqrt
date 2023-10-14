import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, waitFor } from '@motion-canvas/core/lib/flow';
import { Grid, Latex, Node, Ray, Txt } from '@motion-canvas/2d/lib/components';
import { Vector2 } from '@motion-canvas/core/lib/types';
import { linear } from '@motion-canvas/core/lib/tweening';

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
	const twoAbs = createRef<Ray>();
	const oneOrd = createRef<Ray>();
	const twoOrd = createRef<Ray>();

	const vector = createRef<Ray>();
	const x = createRef<Ray>();
	const y = createRef<Ray>();

	const mText = createRef<Txt>();

	const textStyle = {
		fontWeight: 500,
		fontSize: 56,
		offsetY: -1,
		padding: 20,
		cache: true
	};

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
				from={new Vector2(-82, 240)}
				to={new Vector2(-82, 260)}
			/>
			<Ray
				ref={twoAbs}
				lineWidth={tickWidth}
				stroke={'#aaa'}
				start={0}
				end={1}
				from={new Vector2(82, 240)}
				to={new Vector2(82, 260)}
			/>
			<Ray
				ref={oneOrd}
				lineWidth={tickWidth}
				stroke={'#aaa'}
				start={0}
				end={1}
				from={new Vector2(-240, 82)}
				to={new Vector2(-260, 82)}
			/>
			<Ray
				ref={twoOrd}
				lineWidth={tickWidth}
				stroke={'#aaa'}
				start={0}
				end={1}
				from={new Vector2(-240, -82)}
				to={new Vector2(-260, -82)}
			/>

			<Ray
				ref={vector}
				lineWidth={10}
				endArrow
				stroke={'#C878E1'}
				from={new Vector2(-250, 250)}
				to={new Vector2(170, -170)}
				start={0}
				end={1}
			/>

			<Ray
				ref={x}
				lineWidth={8}
				stroke={xColor}
				from={new Vector2(-repereSize, repereSize)}
				to={new Vector2(165, 250)}
				start={0}
				end={1}
			/>
			<Ray
				ref={y}
				lineWidth={8}
				stroke={yColor}
				from={new Vector2(-repereSize, repereSize)}
				to={new Vector2(-repereSize, -165)}
				start={0}
				end={1}
			/>

			<Txt ref={mText} text={'M = 2.5'} fill={'#C878E1'} x={0} y={120} opacity={1} {...textStyle} />
		</Node>
	);

	yield group().position(0, 0);
	yield group().scale(1.2);

	yield* waitFor(1);

	yield* all(...[
		vector().to({ x: -80, y: 80 }, 2),
		x().to({ x: -80, y: 250 }, 2),
		y().to({ x: -250, y: 80 }, 2),
		mText().text('M = 1.0', 2, linear)
	]);

	yield* waitFor(1);

	yield* all(...[
		vector().to({ x: 170, y: -170 }, 2),
		x().to({ x: 165, y: 250 }, 2),
		y().to({ x: -repereSize, y: -165}, 2),
		mText().text('M = 2.5', 2, linear)
	]);
});
