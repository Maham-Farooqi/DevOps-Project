const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Lab Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("GET /labs/:id", () => {
    it("should return lab tests for a patient successfully", async () => {
      const mockLabs = [
        {
          labtest_id: "L1",
          test_type: "Blood Test",
          test_date: "2024-01-15",
          test_time: "14:00:00",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockLabs]);

      const response = await request(app).get("/labs/123").expect(200);

      expect(response.body).toEqual(mockLabs);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/labs/123").expect(500);
    });
  });

  describe("GET /labreports/:patientId", () => {
    it("should return lab reports successfully", async () => {
      const mockReadyReports = [
        {
          labreport_id: "LR1",
          result_date: "2024-01-15",
          test_type: "Blood Test",
        },
      ];
      const mockInProgressReports = [
        {
          LabReport_id: "LR2",
          result_date: "2024-01-16",
          test_type: "Diabetic Test",
        },
      ];

      mockConnection.query
        .mockResolvedValueOnce([mockReadyReports])
        .mockResolvedValueOnce([mockInProgressReports]);

      const response = await request(app).get("/labreports/P1").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.readyReports).toEqual(mockReadyReports);
      expect(response.body.inProgressReports).toEqual(mockInProgressReports);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/labreports/P1").expect(500);
    });
  });

  describe("GET /labtests/:id", () => {
    it("should return blood test results successfully", async () => {
      const mockResults = [
        {
          resultId: "B1",
          gender: "Male",
          dob: "1990-01-01",
          age: 34,
          bloodType: "O+",
          hemoglobin: 14.5,
          plateletsCount: 250000,
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockResults]);

      const response = await request(app)
        .get("/labtests/LR1?testType=Blood Test")
        .expect(200);

      expect(response.body).toEqual(mockResults[0]);
    });

    it("should return diabetic test results successfully", async () => {
      const mockResults = [
        {
          resultId: "D1",
          gender: "Female",
          dob: "1985-05-15",
          age: 39,
          bloodType: "A+",
          HbA1c: 5.5,
          estimatedAvgGlucose: 110,
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockResults]);

      const response = await request(app)
        .get("/labtests/LR2?testType=Diabetic Test")
        .expect(200);

      expect(response.body).toEqual(mockResults[0]);
    });

    it("should return genetic test results successfully", async () => {
      const mockResults = [
        {
          resultId: "G1",
          gender: "Male",
          dob: "1992-03-20",
          age: 32,
          bloodType: "B+",
          gene: "BRCA1",
          DNADescription: "Normal",
          ProteinDescription: "Normal",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockResults]);

      const response = await request(app)
        .get("/labtests/LR3?testType=Genetic Test")
        .expect(200);

      expect(response.body).toEqual(mockResults[0]);
    });

    it("should return 400 for invalid test type", async () => {
      const response = await request(app)
        .get("/labtests/LR1?testType=Invalid Test")
        .expect(400);

      expect(response.body.error).toBe("Invalid test type");
    });

    it("should return empty string when result not found (code bug: checks affectedRows on SELECT)", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      const response = await request(app)
        .get("/labtests/LR999?testType=Blood Test")
        .expect(200);

      expect(response.body).toBe("");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/labtests/LR1?testType=Blood Test").expect(500);
    });
  });

  describe("POST /confirmtest", () => {
    it("should confirm lab test successfully", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: "L5" }]]) // Max lab test ID
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // Insert lab test
        .mockResolvedValueOnce([[{ max_id: "LR5" }]]) // Max lab report ID
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // Insert lab report

      const response = await request(app)
        .post("/confirmtest")
        .send({
          pid: "P1",
          date: "2024-02-01",
          time: "11:00:00",
          test: "Blood Test",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should confirm lab test with no existing tests", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: null }]])
        .mockResolvedValueOnce([{ affectedRows: 1 }])
        .mockResolvedValueOnce([[{ max_id: null }]])
        .mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/confirmtest")
        .send({
          pid: "P1",
          date: "2024-02-01",
          time: "11:00:00",
          test: "Blood Test",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/confirmtest")
        .send({
          pid: "P1",
          date: "2024-02-01",
          time: "11:00:00",
          test: "Blood Test",
        })
        .expect(500);
    });
  });

  describe("POST /reshedulelab", () => {
    it("should reschedule lab test successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/reshedulelab")
        .send({ id: "L1", date: "2024-02-01", time: "15:00:00" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/reshedulelab")
        .send({ id: "L1", date: "2024-02-01", time: "15:00:00" })
        .expect(500);
    });
  });

  describe("DELETE /lab/:id", () => {
    it("should delete lab test successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app).delete("/lab/L1").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Lab test deleted successfully");
    });

    it("should return 404 when lab test not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const response = await request(app).delete("/lab/L999").expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Lab test not found");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).delete("/lab/L1").expect(500);
    });
  });

  describe("GET /labstaffreports/:id", () => {
    it("should return lab staff reports successfully", async () => {
      const mockReports = [
        {
          labreport_id: "LR1",
          test_date: "2024-01-15",
          test_time: "10:00:00",
          test_type: "Blood Test",
          patient_id: "P1",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockReports]);

      const response = await request(app)
        .get("/labstaffreports/LS1")
        .expect(200);

      expect(response.body).toEqual(mockReports);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/labstaffreports/LS1").expect(500);
    });
  });

  describe("GET /lprofiles/:id", () => {
    it("should return lab staff profile successfully", async () => {
      const mockProfile = {
        date_of_birth: "1985-05-15",
        full_name: "Jane Lab",
        email: "jane@example.com",
        contact_number: "9876543210",
        password: "hashed",
        hire_date: "2020-01-01",
      };
      mockConnection.query.mockResolvedValueOnce([[mockProfile]]);

      const response = await request(app).get("/lprofiles/LS1").expect(200);

      expect(response.body).toEqual(mockProfile);
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app).get("/lprofiles/LS1").expect(500);
    });
  });

  describe("POST /addBloodTest", () => {
    it("should add blood test results successfully with existing results", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: "B5" }]]) // Max result ID
        .mockResolvedValueOnce([{ affectedRows: 1 }]) // Insert result
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // Update lab report

      const response = await request(app)
        .post("/addBloodTest")
        .send({
          labReportId: "LR1",
          gender: "Male",
          dob: "1990-01-01",
          age: 34,
          bloodType: "O+",
          hemoglobin: 14.5,
          plateletsCount: 250000,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Record added!");
    });

    it("should add blood test results with no existing results", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: null }]])
        .mockResolvedValueOnce([{ affectedRows: 1 }])
        .mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/addBloodTest")
        .send({
          labReportId: "LR1",
          gender: "Male",
          dob: "1990-01-01",
          age: 34,
          bloodType: "O+",
          hemoglobin: 14.5,
          plateletsCount: 250000,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe("POST /addDiabeticTest", () => {
    it("should add diabetic test results successfully", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: "D5" }]])
        .mockResolvedValueOnce([{ affectedRows: 1 }])
        .mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/addDiabeticTest")
        .send({
          labReportId: "LR2",
          gender: "Female",
          dob: "1985-05-15",
          age: 39,
          bloodType: "A+",
          HbA1c: 5.5,
          estimatedAvgGlucose: 110,
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Record added!");
    });
  });

  describe("POST /addGeneticTest", () => {
    it("should add genetic test results successfully", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[{ max_id: "G5" }]])
        .mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/addGeneticTest")
        .send({
          labReportId: "LR3",
          gender: "Male",
          dob: "1992-03-20",
          age: 32,
          bloodType: "B+",
          gene: "BRCA1",
          DNADescription: "Normal",
          ProteinDescription: "Normal",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Record added!");
    });
  });
});

