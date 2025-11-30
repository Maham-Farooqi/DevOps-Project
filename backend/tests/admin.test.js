const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Admin Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /api/admin-profile/:id", () => {
    it("should return admin profile successfully", async () => {
      const mockProfile = {
        user_id: 1,
        admin_id: "A1",
        full_name: "Admin User",
        email: "admin@example.com",
      };
      mockConnection.query.mockResolvedValueOnce([[mockProfile]]);

      const response = await request(app)
        .get("/api/admin-profile/1")
        .expect(200);

      expect(response.body).toEqual(mockProfile);
    });

    it("should return 404 when admin not found", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      await request(app)
        .get("/api/admin-profile/999")
        .expect(404)
        .expect("User not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/admin-profile/1").expect(500);
    });
  });
});

