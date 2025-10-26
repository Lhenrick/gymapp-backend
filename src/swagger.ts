import fs from "fs";
const spec = {
  openapi: "3.0.0",
  info: { title: "gymapp API", version: "1.0.0" },
  servers: [{ url: "http://localhost:8080/api" }],
  paths: {
    "/auth/register": {
      post: {
        summary: "Register",
        responses: { "201": { description: "Created" } },
      },
    },
    "/auth/login": {
      post: { summary: "Login", responses: { "200": { description: "OK" } } },
    },
    "/auth/me": {
      get: { summary: "Me", responses: { "200": { description: "OK" } } },
    },
    "/catalog/muscles": {
      get: {
        summary: "List muscles",
        responses: { "200": { description: "OK" } },
      },
    },
    "/catalog/exercises": {
      get: {
        summary: "List exercises",
        responses: { "200": { description: "OK" } },
      },
    },
    "/plans": {
      get: { summary: "My plans", responses: { "200": { description: "OK" } } },
      post: {
        summary: "Create plan",
        responses: { "201": { description: "Created" } },
      },
    },
    "/plans/{id}": {
      delete: {
        summary: "Delete plan",
        responses: { "200": { description: "OK" } },
      },
    },
    "/sessions": {
      get: {
        summary: "My sessions",
        responses: { "200": { description: "OK" } },
      },
      post: {
        summary: "Create session",
        responses: { "201": { description: "Created" } },
      },
    },
    "/sessions/{sessionId}/sets": {
      post: {
        summary: "Add set",
        responses: { "201": { description: "Created" } },
      },
    },
    "/stats/overview": {
      get: { summary: "Overview", responses: { "200": { description: "OK" } } },
    },
  },
};
fs.writeFileSync("./openapi.json", JSON.stringify(spec, null, 2));
console.log("openapi.json generated");
