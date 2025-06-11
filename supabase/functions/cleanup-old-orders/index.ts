/*
  # Fonction de nettoyage automatique des commandes

  Cette fonction supprime automatiquement les commandes de plus de 48 heures.
  Elle est conçue pour être exécutée par un cron job ou un déclencheur programmé.
*/

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { createClient } = await import('npm:@supabase/supabase-js@2');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Calculate date 48 hours ago
    const fortyEightHoursAgo = new Date();
    fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

    // Delete orders older than 48 hours
    const { data: deletedOrders, error } = await supabase
      .from('orders')
      .delete()
      .lt('created_at', fortyEightHoursAgo.toISOString())
      .select('id');

    if (error) {
      console.error('Error deleting old orders:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to delete old orders' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const deletedCount = deletedOrders?.length || 0;
    console.log(`Deleted ${deletedCount} orders older than 48 hours`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        deletedCount,
        message: `Successfully deleted ${deletedCount} old orders`
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});