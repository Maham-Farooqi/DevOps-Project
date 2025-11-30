const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Appointments Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /appointments/:id", () => {
    it("should return appointments for a patient successfully", async () => {
      const mockAppointments = [
        {
          appointment_id: "A1",
          appointment_date: "2024-01-15",
          full_name: "Dr. Smith",
          appointment_time: "10:00:00",
          room_id: "R101",
          status: "pending",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockAppointments]);

      const response = await request(app).get("/appointments/123").expect(200);

      expect(response.body).toEqual(mockAppointments);
      expect(mockConnection.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT"),
        ["123"]
      );
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .get("/appointments/123")
        .expect(500)
        .expect("Database query failed");
    });
  });

  describe("POST /confirmApp", () => {
    it("should confirm appointment successfully with existing appointments", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: "A5" }]]) // Max appointment ID
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // Insert

      const response = await request(app)
        .post("/confirmApp")
        .send({ pid: "P1", date: "2024-02-01", time: "10:00:00", did: "D1" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should confirm appointment successfully with no existing appointments", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: null }]]) // No existing appointments
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // Insert

      const response = await request(app)
        .post("/confirmApp")
        .send({ pid: "P1", date: "2024-02-01", time: "10:00:00", did: "D1" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/confirmApp")
        .send({ pid: "P1", date: "2024-02-01", time: "10:00:00", did: "D1" })
        .expect(500);
    });
  });

  describe("POST /resheduleApp", () => {
    it("should reschedule appointment successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/resheduleApp")
        .send({ id: "A1", date: "2024-02-01", time: "14:00:00" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/resheduleApp")
        .send({ id: "A1", date: "2024-02-01", time: "14:00:00" })
        .expect(500);
    });
  });

  describe("DELETE /appointments/:id", () => {
    it("should delete appointment successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .delete("/appointments/A1")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Appointment deleted successfully");
    });

    it("should return 404 when appointment not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const response = await request(app)
        .delete("/appointments/A999")
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Appointment not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).delete("/appointments/A1").expect(500);
    });
  });

  describe("PUT /api/appointments/:id/cancel", () => {
    it("should cancel appointment successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .put("/api/appointments/A1/cancel")
        .expect(200);

      expect(response.body.message).toBe(
        "Appointment status updated to Cancelled successfully"
      );
    });

    it("should return 404 when appointment not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const response = await request(app)
        .put("/api/appointments/A999/cancel")
        .expect(404);

      expect(response.body.message).toBe("Appointment not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).put("/api/appointments/A1/cancel").expect(500);
    });
  });

  describe("PUT /api/reshedule/:id", () => {
    it("should reschedule appointment successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .put("/api/reshedule/A1")
        .send({ date: "2024-02-01", time: "14:00:00" })
        .expect(200);

      expect(response.body.message).toBe(
        "Appointment rescheduled successfully"
      );
    });

    it("should return 400 when date or time is missing", async () => {
      const response = await request(app)
        .put("/api/reshedule/A1")
        .send({ date: "2024-02-01" })
        .expect(400);

      expect(response.body.message).toBe("Date and time are required");
    });

    it("should return 404 when appointment not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const response = await request(app)
        .put("/api/reshedule/A999")
        .send({ date: "2024-02-01", time: "14:00:00" })
        .expect(404);

      expect(response.body.message).toBe("Appointment not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .put("/api/reshedule/A1")
        .send({ date: "2024-02-01", time: "14:00:00" })
        .expect(500);
    });
  });

  describe("GET /api/appointments/:id", () => {
    it("should return appointments for doctor successfully", async () => {
      const mockAppointments = [
        {
          appointment_id: "A1",
          patient_id: "P1",
          doctor_id: "D1",
          appointment_date: "2024-01-15",
          appointment_time: "10:00:00",
          status: "pending",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockAppointments]);

      const response = await request(app)
        .get("/api/appointments/D1")
        .expect(200);

      expect(response.body).toEqual(mockAppointments);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/appointments/D1").expect(500);
    });
  });
});

