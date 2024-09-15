import { emitters } from '$lib/clients';

/** 
 * Accepts POST requests with new instructions and broadcasts it to all clients
 */
export async function POST({ request }) {
  const { instructions } = await request.json();
  
  // Broadcast the instructions to all connected emitters
  emitters.forEach(emit => {
    emit('instructions', instructions);
  });

  return new Response('Instructions sent to all clients');
}
