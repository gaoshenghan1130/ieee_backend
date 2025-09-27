
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

const DB_CONFIG = {
  user: "ieee_pointsys_user",
  host: "dpg-d3bmorj7mgec739rfmo0-a.oregon-postgres.render.com",
  database: "ieee_pointsys",
  password: "gypC1emMeC8TEPYlR9ldJwvDt9y2C0rw",
  port: 5432,
  ssl: { rejectUnauthorized: false },
};

module.exports = {
    FRONTEND_URL,
    BACKEND_URL,
    DB_CONFIG 
};