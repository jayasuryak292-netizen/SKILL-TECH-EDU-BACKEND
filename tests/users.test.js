
require("dotenv").config();

const request = require("supertest");
const app = require("../server");
const jwt = require("jsonwebtoken");
const { describe, test } = require("node:test");
const assert = require("node:assert/strict");

const studentToken = jwt.sign(
  { sub: "1", role: "student" },
  process.env.JWT_SECRET,
  { expiresIn: "5m" }
);

describe("Users API security", () => {
  test("GET /api/users rejects requests without a token", async () => {
    const response = await request(app).get("/api/users");
    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });

  test("GET /api/users/me rejects requests without a token", async () => {
    const response = await request(app).get("/api/users/me");
    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });

  test("POST /api/users rejects requests without a token", async () => {
    const response = await request(app)
      .post("/api/users")
      .send({
        fullName: "Test Student",
        email: "automated.test@example.com",
        password: "TemporaryPass123!",
        role: "student"
      });

    assert.equal(response.status, 401);
    assert.equal(response.body.success, false);
  });

  test("student cannot list all users", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(response.status, 403);
    assert.equal(response.body.success, false);
  });

  test("student cannot create a user", async () => {
    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        fullName: "Blocked Test User",
        email: "blocked-test@example.com",
        password: "TemporaryPass123!",
        role: "student"
      });

    assert.equal(response.status, 403);
    assert.equal(response.body.success, false);
  });

  test("student cannot view another user's profile", async () => {
    const response = await request(app)
      .get("/api/users/2")
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(response.status, 403);
    assert.equal(response.body.success, false);
  });

  test("student can view their own profile", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", `Bearer ${studentToken}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.data.user);
    assert.equal(response.body.data.user.id, 1);
  });
});

  test("administrator can create a user", async (t) => {
    const adminToken = jwt.sign(
      { sub: "2", role: "super_admin" },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    const email = `automated-${Date.now()}@example.com`;

    const response = await request(app)
      .post("/api/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        fullName: "Automated Test User",
        email,
        password: "TemporaryPass123!",
        role: "student"
      });

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.user.email, email);

    const User = require("../src/models/User");
    const createdUser = await User.findOne({ where: { email } });

    t.after(async () => {
      if (createdUser) {
        await createdUser.destroy();
      }
    });

    assert.ok(createdUser);
  });

