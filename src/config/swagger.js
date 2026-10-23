const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "SKILL TECH EDU API",
      version: "1.0.0",
      description:
        "API documentation for the SKILL TECH EDU learning platform."
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: "Local development server"
      }
    ],
    tags: [
      { name: "Health", description: "Backend health checks" },
      { name: "Authentication", description: "User authentication endpoints" },
      { name: "Users", description: "User management endpoints" },
      { name: "Streams", description: "Academic stream endpoints" },
      { name: "Subjects", description: "Subject management endpoints" },
      { name: "Topics", description: "Topic and learning content endpoints" },
      { name: "Notes", description: "Learning notes endpoints" },
      { name: "Favorites", description: "Favorite subjects endpoints" }
    ]
  },
 apis: ["./server.js", "./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;