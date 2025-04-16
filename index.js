export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);

        // --- Basic CORS Headers ---
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*', // Adjust in production if needed
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        // --- End CORS ---

        // API Endpoint for fetching/incrementing the visit count
        if (url.pathname === '/api/visits' && request.method === 'GET') {
            try {
                // Ensure the D1 binding exists
                if (!env.DB) {
                   throw new Error("D1 Database binding 'DB' not found.");
                }

                // Increment the counter AND get the new value.
                // Since D1 doesn't have atomic increment + return, we update then select.
                // We assume a single row with id = 1 exists for the counter.
                const updateStmt = env.DB.prepare(
                    'UPDATE site_visits SET count = count + 1 WHERE id = 1'
                    );
                await updateStmt.run();

                // Select the updated count
                const selectStmt = env.DB.prepare(
                    'SELECT count FROM site_visits WHERE id = 1'
                    );
                const result = await selectStmt.first(); // Use first() as we expect only one row

                const count = result ? result.count : 0; // Handle case where row might not exist initially

                // Return the count as JSON
                return new Response(JSON.stringify({ visits: count }), {
                    headers: {
                        ...corsHeaders, // Include CORS headers
                        'Content-Type': 'application/json'
                    },
                });

            } catch (e) {
                console.error("D1 Error:", e);
                // Don't fail the page load entirely, return a placeholder
                return new Response(JSON.stringify({ visits: 'N/A', error: e.message }), {
                     status: 500, // Internal Server Error
                     headers: {
                        ...corsHeaders, // Include CORS headers
                        'Content-Type': 'application/json'
                    },
                });
            }
        }

        // Fallback for any other requested path
        return new Response('Not Found', {
            status: 404,
            headers: corsHeaders // Include CORS headers
        });
    },
};
