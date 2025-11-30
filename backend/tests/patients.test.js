const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Patients Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /profiles/:id", () => {
    it("should return patient profile successfully", async () => {
      const mockProfile = {
        date_of_birth: "1990-01-01",
        full_name: "John Doe",
        email: "john@example.com",
        contact_number: "1234567890",
        password: "hashed",
        status: "active",
      };
      mockConnection.query.mockResolvedValueOnce([[mockProfile]]);

      const response = await request(app).get("/profiles/P1").expect(200);

      expect(response.body).toEqual(mockProfile);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/profiles/P1").expect(500);
    });
  });

  describe("GET /api/patients/:id", () => {
    it("should return patients for doctor successfully", async () => {
      const mockPatients = [
        {
          full_name: "John Doe",
          date_of_birth: "1990-01-01",
          contact_number: "1234567890",
          status: "pending",
          appointment_time: "10:00:00",
          patient_id: "P1",
          appointment_id: "A1",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockPatients]);

      const response = await request(app).get("/api/patients/D1").expect(200);

      expect(response.body).toEqual(mockPatients);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/patients/D1").expect(500);
    });
  });

  describe("GET /api/diagnosis/:id", () => {
    it("should return diagnosis for patient successfully", async () => {
      const mockDiagnosis = [
        {
          diagnosis_id: "DI1",
          patient_id: "P1",
          diagnosis: "Common cold",
          date: "2024-01-15",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockDiagnosis]);

      const response = await request(app).get("/api/diagnosis/P1").expect(200);

      expect(response.body).toEqual(mockDiagnosis);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/diagnosis/P1").expect(500);
    });
  });

  describe("POST /api/prescriptions", () => {
    it("should create prescription successfully", async () => {
      const mockDate = new Date("2024-01-15T10:30:00");
      jest.setSystemTime(mockDate);

      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/api/prescriptions")
        .send({
          patientId: "P1",
          medicine: "Aspirin",
          dosage: "100mg",
          duration: "7 days",
          diagnosis: "Headache",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Prescription saved successfully");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/api/prescriptions")
        .send({
          patientId: "P1",
          medicine: "Aspirin",
          dosage: "100mg",
          duration: "7 days",
          diagnosis: "Headache",
        })
        .expect(500);
    });
  });

  describe("GET /api/prescriptions/:patientId", () => {
    it("should return prescription history successfully", async () => {
      const mockHistory = [
        {
          date: "2024-01-15",
          diagnosis: "Headache",
          prescription: "Aspirin - 100mg - 7 days",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockHistory]);

      const response = await request(app)
        .get("/api/prescriptions/P1")
        .expect(200);

      expect(response.body).toEqual(mockHistory);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/api/prescriptions/P1").expect(500);
    });
  });
});

