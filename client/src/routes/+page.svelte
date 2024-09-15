<script>
    import { source } from "sveltekit-sse";

    // Listen to the SSE stream
    const connection = source("/custom-event");
    const message = connection.select("message");
</script>

<h1>Root Page</h1>
<p>Latest Message: {$message}</p>
