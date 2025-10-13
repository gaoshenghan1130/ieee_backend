const env = require('dotenv')
env.config();

const RELEASE_MODE = process.env.RELEASE_MODE == 1; // true for deployed version, false for local testing or development

const USING_LOCAL_FRONTEND = process.env.USING_LOCAL_FRONTEND == 1 && !RELEASE_MODE; // true for local frontend, false for developer's testing web page

// Frontend URLs
const LOCAL_FRONTEND_URL = "http://127.0.0.1:5501";
const TEST_FRONTEND_URL = "https://gaoshenghan1130.github.io/ieee_web_page"; // Developers should set this to their own forked repo for testing
const DEPLOYED_FRONTEND_URL = "https://ieee.eecs.umich.edu";

// Backend URLs
const LOCAL_BACKEND_URL = "http://localhost:3000";
const DEPLOYED_BACKEND_URL = "https://en-pt5n.onrender.com";


const FRONTEND_URL = USING_LOCAL_FRONTEND ? LOCAL_FRONTEND_URL : (RELEASE_MODE ? DEPLOYED_FRONTEND_URL : TEST_FRONTEND_URL);
const BACKEND_URL = RELEASE_MODE ? DEPLOYED_BACKEND_URL : LOCAL_BACKEND_URL;

const MAINTAINER = "Gao Shenghan";
const MAINTAINER_EMAIL = "shenghan@umich.edu";
const MAINTAINER_GITHUB = "https://github.com/gaoshenghan1130";
const MAINTAINER_ADMIN_USERNAME = "gsh";

console.log("Maintainer:", MAINTAINER, MAINTAINER_EMAIL, MAINTAINER_GITHUB, MAINTAINER_ADMIN_USERNAME);
console.log("Release mode:", RELEASE_MODE ? "Deployed" : "Development/Testing");

// tokens for authentication
const SECRET_KEY = process.env.SECRET_KEY

// Database configuration
const DB_CONFIG = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: { rejectUnauthorized: false },
};

if (!DB_CONFIG.user || !DB_CONFIG.host || !DB_CONFIG.database || !DB_CONFIG.password || !DB_CONFIG.port) {
    console.error("Database configuration is incomplete. Please constact maintainer " + MAINTAINER + " through " + MAINTAINER_EMAIL + " for .env or remote variables setup.");
    process.exit(1); // Exit the application with an error code
}

module.exports = {
    RELEASE_MODE,
    FRONTEND_URL,
    BACKEND_URL,
    DB_CONFIG,
    SECRET_KEY,
    MAINTAINER,
    MAINTAINER_EMAIL
};