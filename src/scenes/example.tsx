import { makeScene2D } from "@motion-canvas/2d/lib/scenes";
import { CodeBlock, insert } from "@motion-canvas/2d/lib/components/CodeBlock";
import { beginSlide, createRef } from "@motion-canvas/core/lib/utils";
import { all, waitFor, waitUntil } from "@motion-canvas/core/lib/flow";

export default makeScene2D(function* (view) {
  view.fill("#242424"); // set the background of this scene

  const codeRef = createRef<CodeBlock>();
  yield view.add(<CodeBlock ref={codeRef} language="C" />);

  // first slide
  codeRef().code(
    `
    float Q_rsqrt( float number )
    {
      long i;
      float x2, y;
      const float threehalfs = 1.5F;

      x2 = number * 0.5F;
      y  = number;
      i  = * ( long * ) &y;                       // evil floating point bit level hacking
      i  = 0x5f3759df - ( i >> 1 );               // what the fuck? 
      y  = * ( float * ) &i;
      y  = y * ( threehalfs - ( x2 * y * y ) );   // 1st iteration
    //	y  = y * ( threehalfs - ( x2 * y * y ) );   // 2nd iteration, this can be removed
    
      return y;
    }
  `
  );
  codeRef().scale([0.8, 0.8]);
  codeRef().opacity(0);

  yield* beginSlide("first slide");
  yield* all(codeRef().opacity(1, 2), codeRef().scale([0.7, 0.7], 2));

  yield* beginSlide("second slide");
  yield* codeRef().opacity(0, 0.2);
  yield* waitUntil('event');
  yield codeRef().scale([1, 1]);
  yield codeRef().code(`float y = 1 / sqrt(x);`);
  yield* codeRef().opacity(1, 0.3);

  yield* beginSlide("third slide");
  yield* codeRef().edit(1.2, false)`
  ${insert(`#include <math.h>
  `)}
  float y = 1 / sqrt(x);
  `;

  yield* beginSlide("transition slide");
});
