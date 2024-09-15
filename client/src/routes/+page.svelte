<script>
    import { onMount } from 'svelte';
  
    let groceries = [];
    let text = "";
  
    // Base URL for your backend
    const apiBaseUrl = "https://buckethatrobot.onrender.com/"; // site change for deploy
  
    // Fetch updated data from the backend server
    const updateData = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/groceries`, { method: "GET" });
        const data = await response.json();
        groceries = data.groceries;
        text = data.text;
      } catch (err) {
        console.error('Failed to update data:', err);
      }
    };
  
    // Fetch data on mount (client-side only)
    onMount(() => {
      updateData();
    });
  </script>
  
  <style>
    .typing-effect {
      white-space: nowrap;
      overflow: hidden;
      border-right: 3px solid var(--primary);
      animation: typing 3.5s steps(30, end), blink 0.75s step-end infinite;
    }
  
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
  
    @keyframes blink {
      50% {
        border-color: transparent;
      }
    }
  </style>
  
  <div class="container mx-auto p-6 space-y-8 bg-background">
    <!-- Instructions Section -->
    <section class="bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-4 text-primary">Instructions</h1>
      <p class="text-lg text-secondary p-4 border border-gray-300 rounded-lg bg-gray-50 typing-effect">{text}</p>
    </section>
  
    <!-- Grocery List Section -->
    <section class="bg-white shadow-lg rounded-lg p-6">
      <h1 class="text-3xl font-bold mb-4 text-primary">Grocery List</h1>
      <ul class="list-disc pl-6 space-y-2 text-lg text-text">
        {#each groceries as grocery}
          <li>{grocery}</li>
        {/each}
      </ul>
    </section>
  </div>
  