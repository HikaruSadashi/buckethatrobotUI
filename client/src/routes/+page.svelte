<script>
  import { source } from 'sveltekit-sse';

  // Create a single SSE connection
  const connection = source('/custom-event');

  // Select properties from the SSE stream
  const rawMessage = connection.select('message');
  const rawInstructions = connection.select('instructions');
  const rawImgUri = connection.select('img_uri');
  const rawGroceryList = connection.select('grocery_list');

  // Directly use the selected properties in the HTML
</script>

<!-- Display the raw message for debugging -->
<h1>{$rawMessage}</h1>

<!-- Display the data -->
<div class="min-h-screen bg-gray-100 p-6">
  <div class="max-w-4xl mx-auto space-y-8">
    <!-- Grocery List Section -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Grocery List</h2>
      {#if $rawGroceryList}
        <ul class="list-disc pl-5 space-y-2">
          {#each $rawGroceryList.split(',') as item}
            <li>{item.trim()}</li>
          {/each}
        </ul>
      {:else}
        <p>No items available</p>
      {/if}
    </section>

    <!-- Instruction Section -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Instruction</h2>
      <textarea class="w-full p-2 border border-gray-300 rounded" rows="4" readonly>
        {$rawInstructions}
      </textarea>
    </section>

    <!-- Feed Section -->
    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">Feed</h2>
      {#if $rawImgUri}
        <img class="w-full h-auto rounded" src={$rawImgUri} alt="Feed Image"/>
      {:else}
        <p>No image available</p>
      {/if}
    </section>

    <section class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold mb-4">MappedIn</h2>
      <iframe src="/mapped.html" width="600" height="400" frameborder="0"></iframe>
    </section>
  </div>
</div>
