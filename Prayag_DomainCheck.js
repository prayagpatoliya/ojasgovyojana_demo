// ======================================================
// 🔒 Prayag Master Loader with Domain Verification
// Author: Prayag Patoliya
// Website: https://www.linkedin.com/in/prayag-patoliya-88944916b/
// ======================================================

(function() {

  // ✅ Add all allowed domains (supports subdomains)
  const allowedPatterns = [
    "kevorao.com",      // root domain
    "*.kevorao.com",    // any subdomain like app.kevorao.com
    ".kevorao.com"     // alternate syntax for wildcard
  ];

  // Normalize host (remove port, lowercase, etc.)
  function normalizeHost(hostname) {
    let host = hostname.split(':')[0].toLowerCase().trim();
    if (host.startsWith('[') && host.endsWith(']')) host = host.slice(1, -1);
    return host;
  }

  // Match current domain with allowed patterns
  function matchesPattern(host, pattern) {
    if (!pattern) return false;
    pattern = pattern.trim();

    if (pattern === '*') return true;

    if (pattern.startsWith('*.' )) {
      const root = pattern.slice(2).toLowerCase();
      return host === root || host.endsWith('.' + root);
    }

    if (pattern.startsWith('.')) {
      const root = pattern.slice(1).toLowerCase();
      return host === root || host.endsWith('.' + root);
    }

    return host === pattern.toLowerCase();
  }

  // Check if current domain is allowed
  function domainAllowed() {
    const host = normalizeHost(window.location.hostname || '');
    return allowedPatterns.some(pattern => matchesPattern(host, pattern));
  }

  const isAllowed = domainAllowed();

  if (!isAllowed) {
    console.warn(`[Prayag_Master] ❌ Domain not allowed: ${window.location.hostname}`);
    return; // 🚫 Stop script execution
  }

  console.log(`[Prayag_Master] ✅ Verified domain: ${window.location.hostname}`);

  // ======================================================
  // ✅ Load the main Shopify JS script dynamically
  // ======================================================

  const mainScript = document.createElement('script');
  mainScript.src = "https://cdn.shopify.com/s/files/1/0730/6261/3220/files/Prayag_Master.js?v=1762278781";
  mainScript.type = "text/javascript";
  mainScript.async = true;
  document.head.appendChild(mainScript);

})();
