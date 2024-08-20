// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQBwyVV21rlDQg3YDf9ZyNhbUirdz9XR7C53QR3hO-DO_BRJ9M-bGZpLoToPawts-vKrVngJSCFJhWGXsOCiSTFebOOHpyEOVGuAiOynZMV0udFeW1pfz_ZP8_fTzjljlepvg1PBXZII7Va4ACgI8TZFLVld9sLYVqQ7N2E7eGCGu2wx7XHJSE5mEZlItM7KjIXl874WWbWanReCumOzZInUlfBJrX5X0fTDJkjiFxTL4yy1zrYVbFfmH8vlad8CLwVRknSXBRLoR4mJWTqkyrfclJWB5bj8';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
  )).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);