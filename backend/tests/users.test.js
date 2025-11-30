const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Users Management Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /api/users", () => {
    it("should return all users successfully", async () => {
      const mockUsers = [
        { user_id: 1, full_name: "John Doe", email: "john@example.com" },
        { user_id: 2, full_name: "Jane Smith", email: "jane@example.com" },
      ];
      mockConnection.query.mockResolvedValueOnce([mockUsers]);

      const response = await request(app).get("/api/users").expect(200);

      expect(response.body).toEqual(mockUsers);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/users").expect(500);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user by ID successfully", async () => {
      const mockUser = {
        user_id: 1,
        full_name: "John Doe",
        email: "john@example.com",
      };
      mockConnection.query.mockResolvedValueOnce([[mockUser]]);

      const response = await request(app).get("/api/users/1").expect(200);

      expect(response.body).toEqual(mockUser);
    });

    it("should return 404 when user not found", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      await request(app)
        .get("/api/users/999")
        .expect(404)
        .expect("User not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/users/1").expect(500);
    });
  });

  describe("PUT /api/users/:id", () => {
    it("should update user successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .put("/api/users/1")
        .send({ full_name: "Updated Name", email: "updated@example.com" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User updated successfully");
    });

    it("should return 404 when user not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      await request(app)
        .put("/api/users/999")
        .send({ full_name: "Updated Name", email: "updated@example.com" })
        .expect(404)
        .expect("User not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .put("/api/users/1")
        .send({ full_name: "Updated Name", email: "updated@example.com" })
        .expect(500);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app).delete("/api/users/1").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");
    });

    it("should return 404 when user not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      await request(app)
        .delete("/api/users/999")
        .expect(404)
        .expect("User not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).delete("/api/users/1").expect(500);
    });
  });
});

