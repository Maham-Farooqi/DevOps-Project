const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Doctors Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /doctors", () => {
    it("should return all doctors successfully", async () => {
      const mockDoctors = [
        {
          full_name: "Dr. Smith",
          specialization: "Cardiology",
          doctor_id: "D1",
        },
        {
          full_name: "Dr. Jones",
          specialization: "Neurology",
          doctor_id: "D2",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockDoctors]);

      const response = await request(app).get("/doctors").expect(200);

      expect(response.body).toEqual(mockDoctors);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/doctors").expect(500);
    });
  });

  describe("GET /doctor/:id", () => {
    it("should return doctor schedule by appointment ID successfully", async () => {
      const mockSchedule = {
        start_time: "09:00:00",
        end_time: "17:00:00",
      };
      mockConnection.query.mockResolvedValueOnce([[mockSchedule]]);

      const response = await request(app).get("/doctor/A1").expect(200);

      expect(response.body).toEqual(mockSchedule);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/doctor/A1").expect(500);
    });
  });

  describe("GET /doctors/:id", () => {
    it("should return doctor schedule by doctor ID successfully", async () => {
      const mockSchedule = {
        start_time: "09:00:00",
        end_time: "17:00:00",
      };
      mockConnection.query.mockResolvedValueOnce([[mockSchedule]]);

      const response = await request(app).get("/doctors/D1").expect(200);

      expect(response.body).toEqual(mockSchedule);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/doctors/D1").expect(500);
    });
  });

  describe("GET /doctor/appointments/:id", () => {
    it("should return doctor appointments successfully", async () => {
      const mockAppointments = [
        {
          appointment_id: "A1",
          appointment_date: "2024-01-15",
          appointment_time: "10:00:00",
          patient_name: "John Doe",
          room_id: "R101",
          status: "pending",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockAppointments]);

      const response = await request(app)
        .get("/doctor/appointments/D1")
        .expect(200);

      expect(response.body).toEqual(mockAppointments);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/doctor/appointments/D1").expect(500);
    });
  });

  describe("PUT /doctor/appointments/:id", () => {
    it("should update appointment status successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .put("/doctor/appointments/A1")
        .send({ status: "Confirmed" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .put("/doctor/appointments/A1")
        .send({ status: "Confirmed" })
        .expect(500);
    });
  });

  describe("GET /doctor/profile/:id", () => {
    it("should return doctor profile successfully", async () => {
      const mockProfile = {
        doctor_id: "D1",
        full_name: "Dr. Smith",
        specialization: "Cardiology",
        phone_number: "1234567890",
      };
      mockConnection.query.mockResolvedValueOnce([[mockProfile]]);

      const response = await request(app).get("/doctor/profile/D1").expect(200);

      expect(response.body).toEqual(mockProfile);
    });

    it("should return empty object when doctor not found", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      const response = await request(app)
        .get("/doctor/profile/D999")
        .expect(200);

      expect(response.body).toEqual({});
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/doctor/profile/D1").expect(500);
    });
  });

  describe("GET /api/doctor-profile/:id", () => {
    it("should return doctor profile by user ID successfully", async () => {
      const mockProfile = {
        user_id: 1,
        doctor_id: "D1",
        full_name: "Dr. Smith",
        specialization: "Cardiology",
      };
      mockConnection.query.mockResolvedValueOnce([[mockProfile]]);

      const response = await request(app)
        .get("/api/doctor-profile/1")
        .expect(200);

      expect(response.body).toEqual(mockProfile);
    });

    it("should return 404 when user not found", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      await request(app)
        .get("/api/doctor-profile/999")
        .expect(404)
        .expect("User not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/doctor-profile/1").expect(500);
    });
  });
});

