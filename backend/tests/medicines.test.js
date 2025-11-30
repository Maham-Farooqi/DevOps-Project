const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Medicines Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /medicines", () => {
    it("should return all medicines successfully", async () => {
      const mockMedicines = [
        { medicine_id: "M1", name: "Aspirin", stock: 100, price: 5.99 },
        { medicine_id: "M2", name: "Paracetamol", stock: 200, price: 3.99 },
      ];
      mockConnection.query.mockResolvedValueOnce([mockMedicines]);

      const response = await request(app).get("/medicines").expect(200);

      expect(response.body).toEqual(mockMedicines);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/medicines").expect(500);
    });
  });

  describe("GET /api/medicines", () => {
    it("should return all medicines successfully", async () => {
      const mockMedicines = [
        {
          medicine_id: "M1",
          name: "Aspirin",
          stock: 100,
          expiry_date: "2025-12-31",
          category: "Pain Relief",
          description: "Pain reliever",
          price: 5.99,
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockMedicines]);

      const response = await request(app).get("/api/medicines").expect(200);

      expect(response.body).toEqual(mockMedicines);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/medicines").expect(500);
    });
  });

  describe("POST /api/medicinesadd", () => {
    it("should add medicine successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/api/medicinesadd")
        .send({
          name: "New Medicine",
          category: "Pain Relief",
          description: "New pain reliever",
          stock: 50,
          price: 10.99,
          date: "2025-12-31",
        })
        .expect(201);

      expect(response.body.message).toBe("Medicine added successfully");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/api/medicinesadd")
        .send({
          name: "New Medicine",
          category: "Pain Relief",
          description: "New pain reliever",
          stock: 50,
          price: 10.99,
          date: "2025-12-31",
        })
        .expect(500);
    });
  });

  describe("PUT /api/medicines/:id/stock", () => {
    it("should update medicine stock successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .put("/api/medicines/M1/stock")
        .send({ stock: 150 })
        .expect(200);

      expect(response.body.message).toBe("Stock updated successfully");
    });

    it("should return 404 when medicine not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      await request(app)
        .put("/api/medicines/M999/stock")
        .send({ stock: 150 })
        .expect(404)
        .expect("Medicine not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .put("/api/medicines/M1/stock")
        .send({ stock: 150 })
        .expect(500);
    });
  });

  describe("DELETE /api/medicines/:id", () => {
    it("should delete medicine successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .delete("/api/medicines/M1")
        .expect(200);

      expect(response.body.message).toBe("Medicine deleted successfully");
    });

    it("should return 404 when medicine not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      await request(app)
        .delete("/api/medicines/M999")
        .expect(404)
        .expect("Medicine not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).delete("/api/medicines/M1").expect(500);
    });
  });

  describe("POST /orders", () => {
    it("should place order successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/orders")
        .send({
          id: "P1",
          order_date: "2024-01-15",
          cost: 50.99,
          address: "123 Main St",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Order placed successfully");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/orders")
        .send({
          id: "P1",
          order_date: "2024-01-15",
          cost: 50.99,
          address: "123 Main St",
        })
        .expect(500);
    });
  });
});

