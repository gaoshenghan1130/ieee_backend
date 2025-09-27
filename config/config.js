
const RELEASE_MODE = false; // true for deployed version, false for local testing or development


const USING_LOCAL_FRONTEND = true && !RELEASE_MODE; // true for local frontend, false for deployed frontend


// Frontend URLs
const LOCAL_FRONTEND_URL = "http://127.0.0.1:5501";
const TEST_FRONTEND_URL = "https://gaoshenghan1130.github.io/ieee_web_page"; // Developers should set this to their own forked repo for testing
const DEPLOYED_FRONTEND_URL = "https://ieee.eecs.umich.edu";

// Backend URLs
const LOCAL_BACKEND_URL = "http://localhost:3000";
const DEPLOYED_BACKEND_URL = "https://en-pt5n.onrender.com";


const FRONTEND_URL = USING_LOCAL_FRONTEND ? LOCAL_FRONTEND_URL : (RELEASE_MODE ? DEPLOYED_FRONTEND_URL : TEST_FRONTEND_URL);
const BACKEND_URL = RELEASE_MODE ? DEPLOYED_BACKEND_URL : LOCAL_BACKEND_URL;


module.exports = {
    FRONTEND_URL,
    BACKEND_URL
};