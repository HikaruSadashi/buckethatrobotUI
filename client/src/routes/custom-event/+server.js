// src/routes/custom-event/+server.js
import { produce } from 'sveltekit-sse';
import { emitters } from '$lib/clients';

export function POST() {
  return produce(({ emit, lock }) => {
    // Add the current client's emitter to the global emitters set
    emitters.add(emit);
    
    return function stop() {
      // Remove the emitter when the client disconnects
      emitters.delete(emit);
    };
  });
}
