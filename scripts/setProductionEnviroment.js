const path = require("path");
const fs = require("fs");
const propmpt = require("prompt");
const rootProjectPath = path.join(__dirname, "..");
const rootBackendPath = path.join(rootProjectPath, "backend");
const rootFrontendPath = path.join(rootProjectPath, "frontend");
const dockerDbSecretsPath = path.join(
  rootProjectPath,
  "docker",
  "mongo",
  "secrets"
);
const envBackendPath = path.join(rootBackendPath, "app", "env");
// Create docker secrets for mongo
fs.existsSync(dockerDbSecretsPath) ||
  fs.mkdirSync(dockerDbSecretsPath, { recursive: true });
propmpt.message = "";
propmpt.start();
propmpt
  .get([
    {
      name: "backend_host",
      description: "Enter backend listening interface",
      default: "0.0.0.0",
      type: "string",
      required: true,
      before: (value) => value.trim(),
    },
    {
      name: "backend_origin",
      description: "Enter backend origin",
      default: "http://localhost:5050",
      type: "string",
      required: true,
      before: (value) => value.trim(),
    },
    {
      name: "backend_api_url",
      description: "Enter backend api url",
      default: "http://localhost:5050/api/v1",
      type: "string",
      required: true,
      before: (value) => value.trim(),
    },
    {
      name: "jwt_access_secret",
      description: "Enter JWT access secret",
      default: "secret",
      type: "string",
      required: true,
      before: (value) => value.trim(),
    },
    {
      name: "jwt_refresh_secret",
      description: "Enter JWT refresh secret",
      default: "secret",
      type: "string",
      required: true,
      before: (value) => value.trim(),
    },
    {
      name: "mongo_pass",
      description: "Enter mongo password",
      type: "string",
      pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
      message:
        "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character",
      required: true,
      before: (value) => value.trim(),
      hidden: true,
    },
  ])
  .then((result) => {
    console.log("Creating docker secrets for mongo");
    const {
      backend_host,
      backend_origin,
      backend_api_url,
      jwt_access_secret,
      jwt_refresh_secret,
      mongo_pass,
    } = result;

    const prodFrontendData = `VITE_API_URL=${backend_api_url}` + "\n";

    const prodBackendData =
      `PORT=5050` +
      "\n" +
      `HOST=${backend_host}` +
      "\n" +
      `ORIGIN=${backend_origin}` +
      "\n" +
      `JWT_ACCESS_SECRET=${jwt_access_secret}` +
      "\n" +
      `JWT_REFRESH_SECRET=${jwt_refresh_secret}` +
      "\n" +
      `DB_CONNECTION_STRING=mongodb://todo:${mongo_pass}@db:27017/todo?authMechanism=DEFAULT&authSource=admin`;
    fs.writeFileSync(
      path.join(dockerDbSecretsPath, "db_pass"),
      result.mongo_pass
    );
    console.info("Docker secrets created");
    fs.writeFileSync(path.join(envBackendPath, "prod.env"), prodBackendData);
    console.info("Production env backend file created");
    fs.writeFileSync(
      path.join(rootFrontendPath, ".env.production"),
      prodFrontendData
    );
    console.info("Production env frontend file created");
  }, console.error);
