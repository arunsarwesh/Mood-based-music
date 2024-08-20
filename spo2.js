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

const topTracksIds = [
  '0DAGFNb2Mn8jYt69rcRnsY','75jYmiAUs2Nrdm4JnC02NH','6sAdmaffuMijDszeFrGF1H','4jWwMOU0jnFLb94O5Zo817','3jrOziEVwpJAETyEDZ5HWa'
];

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({name, artists}) =>
      `${name} by ${artists.map(artist => artist.name).join(', ')}`
  )
);