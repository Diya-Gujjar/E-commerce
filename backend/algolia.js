const algoliasearch = require("algoliasearch").default;
const AppId = process.env.Application_ID;
const AdminAPIKey = process.env.Admin_API_Key;

const client = algoliasearch(AppId, AdminAPIKey);
const index = client.initIndex("products");

module.exports = index;
