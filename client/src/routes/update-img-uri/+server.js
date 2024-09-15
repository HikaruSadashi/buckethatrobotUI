import { emitters } from '$lib/clients';

/** 
 * Accepts POST requests with a new image URI and broadcasts it to all clients
 */
export async function POST({ request }) {
  const { img_uri } = await request.json();
  
  // Broadcast the image URI to all connected emitters
  emitters.forEach(emit => {
    emit('img_uri', img_uri);
  });

  return new Response('Image URI sent to all clients');
}
