export async function GET(request) {
  try {
    const url = new URL(request.url);
    const queryParams = url.searchParams;

    const limit = queryParams.get('limit') ?? 15;
    const skip = queryParams.get('skip') ?? 0;
    const sortBy = queryParams.get('sortBy') ?? 'createdAt';
    const sort = queryParams.get('sort') ?? -1;
    const minCtc = queryParams.get('minCtc') ?? -1;
    const minYoe = queryParams.get('minYoe') ?? -1;
    const maxYoe = queryParams.get('maxYoe') ?? -1;
    const _company = queryParams.get('_company') ?? []
    const _location = queryParams.get('_location') ?? []

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api?limit=${limit}&skip=${skip}&sort=${sort}&sortBy=${sortBy}&minCtc=${minCtc}&minYoe=${minYoe}&maxYoe=${maxYoe}&_company=${_company}&_location=${_location}`,
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
