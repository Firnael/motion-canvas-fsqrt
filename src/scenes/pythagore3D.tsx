import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { all, waitFor } from '@motion-canvas/core/lib/flow';
import { Latex, Node, Ray } from '@motion-canvas/2d/lib/components';
import { createRef } from '@motion-canvas/core/lib/utils';
import { Vector2 } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
	const rlw = 2;
	const texW = 30;

	view.fill('#242424');

	const group = createRef<Node>();

	const vector = createRef<Ray>();

	const abs = createRef<Ray>();
	const ord = createRef<Ray>();
	const alt = createRef<Ray>();

	const x = createRef<Ray>();
	const y = createRef<Ray>();
	const z = createRef<Ray>();

	const vTex = createRef<Latex>();
	const xTex = createRef<Latex>();
	const yTex = createRef<Latex>();
	const zTex = createRef<Latex>();

	view.add(
		<Node ref={group}>

			<Ray
				ref={abs}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-300, 300)}
				to={new Vector2(400, 300)}
				start={0}
				end={1}
			/>
			<Ray
				ref={ord}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-300, 300)}
				to={new Vector2(-300, -200)}
				start={0}
				end={1}
			/>
			<Ray
				ref={alt}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-300, 300)}
				to={new Vector2(400, 300)}
				start={0}
				end={1}
			/>
			
			<Ray
				ref={vector}
				lineWidth={20}
				endArrow
				stroke={'#C878E1'}
				from={new Vector2(-150, 200)}
				to={new Vector2(150, -100)}
				start={0}
				end={1}
			/>
			<Latex ref={vTex} tex="\textcolor{#C878E1}{V}" x={-50} y={0} width={texW * 1.5} />

			<Ray
				ref={x}
				lineWidth={8}
				stroke={'#66ABE1'}
				from={new Vector2(-150, 200)}
				to={new Vector2(150, 200)}
				start={0}
				end={1}
			/>
			<Latex ref={xTex} tex="\textcolor{#66ABE1}{x}" x={0} y={250} opacity={1} width={texW} />

			<Ray
				ref={y}
				lineWidth={10}
				stroke={'#9CC281'}
				from={new Vector2(150, 200)}
				to={new Vector2(150, -100)}
				start={0}
				end={1}
			/>
			<Latex ref={yTex} tex="\textcolor{#9CC281}{y}" x={200} y={50} opacity={1} width={texW} />

			<Ray
				ref={z}
				lineWidth={8}
				stroke={'#DCBD87'}
				from={new Vector2(150, 250)}
				to={new Vector2(250, 150)}
				start={0}
				end={0}
			/>
			<Latex ref={zTex} tex="\textcolor{#DCBD87}{z}" x={230} y={230} opacity={0} width={texW} />
		</Node>
	);

	yield group().position(-100, -100);
	yield group().scale(1.5);
	yield x();
	yield y();
	yield abs();
	yield ord();
	yield alt();

	yield* waitFor(1);

	yield* all(
		...[
			abs().to(new Vector2(400, 400), 1),
			alt().to(new Vector2(400, 200), 1),
			x().to(new Vector2(150, 250), 1),
			y().from(new Vector2(250, 150), 1),
			z().start(1, 1),
			xTex().x(0, 1),
			xTex().y(270, 1),
			yTex().x(250, 1),
			yTex().y(0, 1),
			zTex().opacity(1, 1)
		]
	);

	yield* all(
		...[
			abs().opacity(0, 1),
			ord().opacity(0, 1),
			alt().opacity(0, 1)
		]
	);
});
