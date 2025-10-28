// Minimal service worker: does not cache (keeps behaviour predictable for prototype)
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  // skipWaiting not used to keep things simple
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

// Optional: basic fetch handler — passthrough to network
// NOTE: Removed no-op fetch handler to avoid browser warning about no-op fetch handlers
// A fetch listener that doesn't handle requests can add overhead during navigation.
// If you later want caching/offline behavior, implement a concrete fetch handler here.
