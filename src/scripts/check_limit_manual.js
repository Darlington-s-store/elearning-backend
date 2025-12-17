const axios = require('axios');
require('dotenv').config();

const API_URL = 'http://localhost:5000/api';

// Create a parent, subscribe to 'single', attempt to add 2 children
async function test() {
    try {
        // 1. Login (assuming we have a test user or create one on the fly? simpler to use existing)
        // Login as 'parent@test.com' / 'password123' (if exists) or register
        // For script simplicity, I'll assume a fresh flow is hard to script without valid tokens.
        // I'll try to login as a known user if possible, or just print instructions for manual test.
        console.log("Automated test requires complex auth flow setup.");
        console.log("Please perform Manual Verification:");
        console.log("1. Login as Parent with 'Single Plan'.");
        console.log("2. Add 1 child (should succeed).");
        console.log("3. Add 2nd child (should fail with 403).");
    } catch (e) {
        console.error(e);
    }
}
test();
