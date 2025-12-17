// Simple local health check using global fetch (Node 18+)
(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/health', { method: 'GET' });
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Body:', text);
  } catch (err) {
    console.error('Health check failed:', err.message || err);
    process.exitCode = 2;
  }
})();
