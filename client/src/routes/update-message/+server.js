// src/routes/update-message/+server.js
import { emitters } from '$lib/clients';

/** 
 * Accepts POST requests with a new message and broadcasts it to all clients
 */
export async function POST({ request }) {
  const { message } = await request.json(); // Extract message from the POST body
  
  // Broadcast the message to all connected emitters
  emitters.forEach(emit => {
    emit('message', message);
  });

  return new Response('Message sent to all clients');
}
