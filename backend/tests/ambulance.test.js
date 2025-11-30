const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Ambulance Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("POST /ambulance", () => {
    it("should request ambulance successfully with existing calls", async () => {
      const mockDate = new Date("2024-01-15T10:30:00");
      jest.setSystemTime(mockDate);

      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: "C5" }]]) // Max call ID
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // Insert

      const response = await request(app)
        .post("/ambulance")
        .send({ pid: "P1", address: "123 Main St" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.call_id).toBe("C6");
      expect(response.body.address).toBe("123 Main St");
    });

    it("should request ambulance with no existing calls", async () => {
      const mockDate = new Date("2024-01-15T10:30:00");
      jest.setSystemTime(mockDate);

      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: null }]])
        .mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/ambulance")
        .send({ pid: "P1", address: "123 Main St" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.call_id).toBe("C1");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/ambulance")
        .send({ pid: "P1", address: "123 Main St" })
        .expect(500);
    });
  });
});

