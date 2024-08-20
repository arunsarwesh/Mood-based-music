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

const tracksUri = [
  'spotify:track:0DAGFNb2Mn8jYt69rcRnsY','spotify:track:7i8wLMUrqM3stvzAyOCzfw','spotify:track:75jYmiAUs2Nrdm4JnC02NH','spotify:track:1ifMH14KizpUxIdRVyPsSZ','spotify:track:6sAdmaffuMijDszeFrGF1H','spotify:track:3WqPXSsDs2yy4NI2ncn6PS','spotify:track:4jWwMOU0jnFLb94O5Zo817','spotify:track:4bmAHWNpdRXTpk5wsBQL29','spotify:track:3jrOziEVwpJAETyEDZ5HWa','spotify:track:65zT93vcXbMxbs05YYP8dg'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
