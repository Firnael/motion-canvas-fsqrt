import { makeScene2D } from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';
import { all } from '@motion-canvas/core/lib/flow';
import { Latex, Node, Ray } from '@motion-canvas/2d/lib/components';
import { Vector2 } from '@motion-canvas/core/lib/types';

export default makeScene2D(function* (view) {
	const rlw = 2;
	const texW = 30;

	view.fill('#242424');

	const group = createRef<Node>();

	const abs = createRef<Ray>();
	const ord = createRef<Ray>();

	const ppH = createRef<Ray>();
	const ppV = createRef<Ray>();

	const vector = createRef<Ray>();
	const x = createRef<Ray>();
	const y = createRef<Ray>();

	const vTex = createRef<Latex>();
	const xTex = createRef<Latex>();
	const yTex = createRef<Latex>();

	view.add(
		<Node ref={group}>
			<Ray
				ref={abs}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-300, 300)}
				to={new Vector2(400, 300)}
				start={0}
				end={0}
			/>
			<Ray
				ref={ord}
				lineWidth={rlw}
				stroke={'white'}
				from={new Vector2(-300, 300)}
				to={new Vector2(-300, -200)}
				start={0}
				end={0}
			/>

			<Ray
				ref={vector}
				lineWidth={20}
				endArrow
				stroke={'#C878E1'}
				from={new Vector2(-150, 200)}
				to={new Vector2(150, -100)}
				start={0}
				end={0}
			/>
			<Latex ref={vTex} tex="\textcolor{#C878E1}{V}" x={-50} y={0} opacity={0} width={texW * 1.5} />

			<Ray
				ref={x}
				lineWidth={8}
				stroke={'#66ABE1'}
				from={new Vector2(-150, 200)}
				to={new Vector2(150, 200)}
				start={0}
				end={0}
			/>
			<Latex ref={xTex} tex="\textcolor{#66ABE1}{x}" x={0} y={250} opacity={0} width={texW} />

			<Ray
				ref={y}
				lineWidth={10}
				stroke={'#9CC281'}
				from={new Vector2(150, 200)}
				to={new Vector2(150, -100)}
				start={0}
				end={0}
			/>
			<Latex ref={yTex} tex="\textcolor{#9CC281}{y}" x={200} y={50} opacity={0} width={texW} />

            <Ray
				ref={ppH}
				lineWidth={4}
				stroke={'#FF6961'}
				from={new Vector2(100, 150)}
				to={new Vector2(150, 150)}
				start={0}
				end={0}
			/>
			<Ray
				ref={ppV}
				lineWidth={4}
				stroke={'#FF6961'}
				from={new Vector2(100, 200)}
				to={new Vector2(100, 150)}
				start={0}
				end={0}
			/>
		</Node>
	);

	yield group().position(-100, -100);
	yield group().scale(1.5);

	yield* all(...[abs().start(1, 1), ord().start(1, 1)]);

	yield* all(...[vector().start(1, 1), vTex().opacity(1, 1)]);

	yield* all(...[x().start(1, 1), xTex().opacity(1, 1)]);
	yield* all(...[y().start(1, 1), yTex().opacity(1, 1)]);

    yield* ppV().start(1, 0.2);
	yield* ppH().start(1, 0.2);

	yield* all(...[abs().opacity(0, 1), ord().opacity(0, 1)]);
});
