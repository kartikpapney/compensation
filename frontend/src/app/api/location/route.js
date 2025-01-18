export async function GET(request) {
    try {

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/location`,
      );
      const data = await res.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  