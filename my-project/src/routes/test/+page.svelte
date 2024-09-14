<script>
    import { onMount } from "svelte";
  
    // Backend server URL (you can easily switch between different environments)
    let backendUrl = "http://localhost:3000";  // Change this if your backend is hosted elsewhere
    
    let groceryItem = "";
    let groceryList = [];
    let storeInstructions = "Loading store instructions...";
  
    // Load grocery list from localStorage on mount
    onMount(() => {
      const savedList = localStorage.getItem("groceryList");
      if (savedList) {
        groceryList = JSON.parse(savedList);
      }
      fetchInstructions();
      listenForInstructions();  // Start listening for real-time updates
    });
  
    // Function to add grocery item to the list
    function addGroceryItem() {
      if (groceryItem.trim() !== "") {
        groceryList.push(groceryItem.trim());
        groceryItem = "";
        localStorage.setItem("groceryList", JSON.stringify(groceryList));
  
        // Optionally, send the new item to the backend (comment out if you don't need this)
        fetch(`${backendUrl}/api/grocery-list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ item: groceryItem })
        }).catch((error) => console.error("Error adding item to the backend:", error));
      }
    }
  
    // Fetch instructions from the API (backend server)
    async function fetchInstructions() {
      try {
        const response = await fetch(`${backendUrl}/api/instructions`);
        const data = await response.json();
        storeInstructions = data.instructions;
      } catch (error) {
        console.error("Error fetching instructions", error);
      }
    }
  
    // Listen for POST requests (instructions) using EventSource
    function listenForInstructions() {
      if (typeof window !== 'undefined') {  // Make sure it's running on the client
        const eventSource = new EventSource(`${backendUrl}/api/listen-instructions`);
        eventSource.onmessage = function (event) {
          storeInstructions = event.data;
        };
      }
    }
  </script>
  
  <style>
    .container {
      margin: 20px;
    }
  </style>
  
  <div class="container">
    <!-- Title Section -->
    <h1 class="text-3xl font-bold mb-4">BucketHat Robot</h1>
  
    <!-- Grocery Item Input Section -->
    <div class="mb-6">
      <input
        type="text"
        class="input input-bordered w-full max-w-xs"
        placeholder="Add grocery item"
        bind:value={groceryItem}
      />
      <button class="btn btn-primary ml-2" on:click={addGroceryItem}>
        Add Item
      </button>
    </div>
  
    <!-- Grocery List Display -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Shopping List</h2>
      <ul>
        {#each groceryList as item}
          <li class="mb-2">{item}</li>
        {/each}
      </ul>
    </div>
  
    <!-- Store Instructions Section -->
    <div class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Store Instructions</h2>
      <p>{storeInstructions}</p>
    </div>
  </div>
  