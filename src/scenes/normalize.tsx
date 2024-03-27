import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all, waitFor } from '@motion-canvas/core/lib/flow';
import { Circle, Grid, Latex, Line, Node, Ray, Txt } from '@motion-canvas/2d/lib/components';
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

	const circle = createRef<Circle>();

	const abs = createRef<Ray>();
	const ord = createRef<Ray>();
	const oneAbs = createRef<Ray>();
	const twoAbs = createRef<Ray>();
	const oneOrd = createRef<Ray>();
	const twoOrd = createRef<Ray>();
	const xLine = createRef<Ray>();
	const yLine = createRef<Ray>();

	const vector = createRef<Ray>();
	const x = createRef<Ray>();
	const y = createRef<Ray>();

	const mText = createRef<Txt>();
	const xText = createRef<Txt>();
	const yText = createRef<Txt>();
	const zeroText = createRef<Txt>();
	const oneAbsText = createRef<Txt>();
	const twoAbsText = createRef<Txt>();
	const oneOrdText = createRef<Txt>();
	const twoOrdText = createRef<Txt>();

	const lVal = createSignal(Math.sqrt(8));
	const xVal = createSignal(2);
	const yVal = createSignal(2);

	const textStyle = {
		fontWeight: 500,
		fontSize: 50,
		offsetY: -1,
		padding: 20,
		cache: true
	};
	const smallTextStyle = {...textStyle};
	smallTextStyle.fontSize = 30;
	const mediumTextStyle = {...textStyle};
	mediumTextStyle.fontSize = 40;

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

			<Circle
				ref={circle}
				size={334}
				opacity={0}
            	stroke={'#fff'}
            	lineWidth={4}
				lineDash={[10, 10]}
            	margin={2}
				x={-250}
				y={250}
			/>

			<Ray
				ref={abs}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-repereSize, repereSize - 2)}
				to={new Vector2(repereSize, repereSize - 2)}
				endArrow
				start={0}
				end={1}
			/>
			<Ray
				ref={ord}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-repereSize + 2, repereSize)}
				to={new Vector2(-repereSize + 2, -repereSize)}
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
				to={new Vector2(82, -82)}
				start={0}
				end={1}
			/>
			<Ray
				ref={x}
				lineWidth={8}
				stroke={xColor}
				from={new Vector2(-repereSize, 250)}
				to={new Vector2(82, 250)}
				start={0}
				end={1}
			/>
			<Ray
				ref={y}
				lineWidth={8}
				stroke={yColor}
				from={new Vector2(-repereSize, repereSize)}
				to={new Vector2(-repereSize, -82)}
				start={0}
				end={1}
			/>

			<Ray
				ref={xLine}
				lineWidth={4}
				stroke={xColor}
				from={new Vector2(-132, 250)}
				to={new Vector2(-132, 140)}
				lineDash={[8, 8]}
				opacity={0}
				start={0}
				end={1}
			/>
			<Ray
				ref={yLine}
				lineWidth={4}
				stroke={yColor}
				from={new Vector2(-250, 132)}
				to={new Vector2(-132, 132)}
				lineDash={[10, 10]}
				opacity={0}
				start={0}
				end={1}
			/>

			<Txt ref={zeroText} text={'0'} fill={'#aaa'} x={-265} y={235} opacity={1} {...smallTextStyle} />
			<Txt ref={oneAbsText} text={'1'} fill={'#aaa'} x={-82} y={250} opacity={1} {...smallTextStyle} />
			<Txt ref={twoAbsText} text={'2'} fill={'#aaa'} x={82} y={250} opacity={1} {...smallTextStyle} />
			<Txt ref={oneOrdText} text={'1'} fill={'#aaa'} x={-280} y={50} opacity={1} {...smallTextStyle} />
			<Txt ref={twoOrdText} text={'2'} fill={'#aaa'} x={-280} y={-115} opacity={1} {...smallTextStyle} />
			<Txt ref={mText} text={() => lVal().toFixed(2).toString()} fill={'#C878E1'} x={142} y={-152} opacity={1} {...textStyle} />
			<Txt ref={xText} text={() => xVal().toFixed(2).toString()} fill={xColor} x={103} y={repereSize} opacity={1} {...smallTextStyle} />
			<Txt ref={yText} text={() => yVal().toFixed(2).toString()} fill={yColor} x={-repereSize - 50} y={-115} opacity={1} {...smallTextStyle} />

		</Node>
	);

	yield group().position(0, 0);
	yield group().scale(1.2);

	// réduit
	yield* all(...[
		vector().to({ x: -132, y: 132 }, 2, easeInOutQuad),
		x().to({ x: -132, y: 250 }, 2, easeInOutQuad),
		y().to({ x: -250, y: 132 }, 2, easeInOutQuad),
		mText().position({x: -80, y: 60}, 2, easeInOutQuad),
		xText().x(-132, 2, easeInOutQuad),
		yText().y(100, 2, easeInOutQuad),
		lVal(1, 2, easeInOutQuad),
		xVal(Math.sqrt(2) / 2, 2, easeInOutQuad),
		yVal(Math.sqrt(2) / 2, 2, easeInOutQuad),
	]);

	yield* all(...[
		circle().opacity(0.6, 2, easeInOutQuad),
		xLine().opacity(1, 2, easeInOutQuad),
		yLine().opacity(1, 2, easeInOutQuad),
		vector().opacity(0.4, 2, easeInOutQuad),
	]);
	
	yield* waitFor(0.5);

	yield* all(...[
		circle().opacity(0, 0.5, easeInOutQuad),
		xLine().opacity(0, 0.5, easeInOutQuad),
		yLine().opacity(0, 0.5, easeInOutQuad),
		vector().opacity(1, 0.5, easeInOutQuad),
	]);

	// grandit
	yield* all(...[
		vector().to({ x: 82, y: -82 }, 2, easeInOutQuad),
		x().to({ x: 82, y: 250 }, 2, easeInOutQuad),
		y().to({ x: -repereSize, y: 10}, 2, easeInOutQuad),
		mText().position({x: 142, y: -152}, 2, easeInOutQuad),
		xText().x(103, 2, easeInOutQuad),
		yText().y(-115, 2, easeInOutQuad),
		lVal(Math.sqrt(8), 2, easeInOutQuad),
		xVal(2, 2, easeInOutQuad),
		yVal(2, 2, easeInOutQuad),
	]);

	yield* waitFor(1);
});
