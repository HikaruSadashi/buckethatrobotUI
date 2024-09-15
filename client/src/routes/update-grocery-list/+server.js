import { emitters } from '$lib/clients';

/** 
 * Accepts POST requests with a new grocery list and broadcasts it to all clients
 */
export async function POST({ request }) {
  const { grocery_list } = await request.json();
  
  // Broadcast the grocery list to all connected emitters
  emitters.forEach(emit => {
    emit('grocery_list', grocery_list);
  });

  return new Response('Grocery list sent to all clients');
}
