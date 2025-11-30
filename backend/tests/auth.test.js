const request = require("supertest");
const { app, mockConnection } = require("./setup");

describe("Authentication Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("POST /login", () => {
    it("should login patient successfully", async () => {
      const mockUser = {
        user_id: 1,
        email: "patient@example.com",
        password: "password123",
        role: "patient",
      };
      const mockPatient = [{ patient_id: "P1" }];

      mockConnection.query
        .mockResolvedValueOnce([[mockUser]])
        .mockResolvedValueOnce([mockPatient]);

      const response = await request(app)
        .post("/login")
        .send({ username: "patient@example.com", password: "password123" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.patient_id).toBe("P1");
    });

    it("should login lab staff successfully", async () => {
      const mockUser = {
        user_id: 2,
        email: "lab@example.com",
        password: "password123",
        role: "labstaff",
      };
      const mockLabStaff = [{ lab_staff_id: "LS1" }];

      mockConnection.query
        .mockResolvedValueOnce([[mockUser]])
        .mockResolvedValueOnce([mockLabStaff]);

      const response = await request(app)
        .post("/login")
        .send({ username: "lab@example.com", password: "password123" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.lab_staff_id).toBe("LS1");
    });

    it("should login doctor successfully", async () => {
      const mockUser = {
        user_id: 3,
        email: "doctor@example.com",
        password: "password123",
        role: "doctor",
      };
      const mockDoctor = [{ doctor_id: "D1" }];

      mockConnection.query
        .mockResolvedValueOnce([[mockUser]])
        .mockResolvedValueOnce([mockDoctor]);

      const response = await request(app)
        .post("/login")
        .send({ username: "doctor@example.com", password: "password123" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.doctor_id).toBe("D1");
    });

    it("should login admin successfully", async () => {
      const mockUser = {
        user_id: 4,
        email: "admin@example.com",
        password: "password123",
        role: "admin",
      };
      const mockAdmin = [{ admin_id: "A1" }];

      mockConnection.query
        .mockResolvedValueOnce([[mockUser]])
        .mockResolvedValueOnce([mockAdmin]);

      const response = await request(app)
        .post("/login")
        .send({ username: "admin@example.com", password: "password123" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.user.admin_id).toBe("A1");
    });

    it("should return 400 for invalid credentials", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      const response = await request(app)
        .post("/login")
        .send({ username: "wrong@example.com", password: "wrong" })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid id or password");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/login")
        .send({ username: "test@example.com", password: "test" })
        .expect(500);
    });
  });

  describe("POST /api/signup", () => {
    it("should signup user successfully", async () => {
      mockConnection.query
        .mockResolvedValueOnce([[]]) // Email check
        .mockResolvedValueOnce([[{ maxUserId: 5 }]]) // Max user ID
        .mockResolvedValueOnce([{ affectedRows: 1 }]); // Insert

      const response = await request(app)
        .post("/api/signup")
        .send({
          fullName: "New User",
          email: "newuser@example.com",
          dob: "1990-01-01",
          contactNumber: "1234567890",
          password: "password123",
        })
        .expect(201);

      expect(response.body.message).toBe("User registered successfully");
    });

    it("should return 400 when email already exists", async () => {
      mockConnection.query.mockResolvedValueOnce([
        [{ email: "existing@example.com" }],
      ]);

      const response = await request(app)
        .post("/api/signup")
        .send({
          fullName: "New User",
          email: "existing@example.com",
          dob: "1990-01-01",
          contactNumber: "1234567890",
          password: "password123",
        })
        .expect(400);

      expect(response.body.error).toBe("Email already exists");
    });

    it("should return 400 when fields are missing", async () => {
      const response = await request(app)
        .post("/api/signup")
        .send({
          fullName: "New User",
          email: "newuser@example.com",
        })
        .expect(400);

      expect(response.body.error).toBe("All fields are required");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/api/signup")
        .send({
          fullName: "New User",
          email: "newuser@example.com",
          dob: "1990-01-01",
          contactNumber: "1234567890",
          password: "password123",
        })
        .expect(500);
    });
  });

  describe("POST /doctor/login", () => {
    it("should login doctor successfully", async () => {
      const mockDoctor = [
        {
          doctor_id: "D1",
          full_name: "Dr. Smith",
          specialization: "Cardiology",
          contact_number: "1234567890",
        },
      ];
      mockConnection.query.mockResolvedValueOnce([mockDoctor]);

      const response = await request(app)
        .post("/doctor/login")
        .send({ email: "doctor@example.com", password: "password123" })
        .expect(200);

      expect(response.body.doctor).toEqual(mockDoctor[0]);
    });

    it("should return 400 for invalid credentials", async () => {
      mockConnection.query.mockResolvedValueOnce([[]]);

      await request(app)
        .post("/doctor/login")
        .send({ email: "wrong@example.com", password: "wrong" })
        .expect(400)
        .expect("Invalid email or password");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/doctor/login")
        .send({ email: "doctor@example.com", password: "password123" })
        .expect(500);
    });
  });

  describe("POST /api/update-profile", () => {
    it("should update profile successfully", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 1 }]);

      const response = await request(app)
        .post("/api/update-profile")
        .send({
          id: 1,
          name: "Updated Name",
          email: "updated@example.com",
          password: "newpassword",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Profile updated successfully");
    });

    it("should return 400 when fields are missing", async () => {
      const response = await request(app)
        .post("/api/update-profile")
        .send({
          id: 1,
          name: "Updated Name",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("All fields are required.");
    });

    it("should return 404 when user not found", async () => {
      mockConnection.query.mockResolvedValueOnce([{ affectedRows: 0 }]);

      const response = await request(app)
        .post("/api/update-profile")
        .send({
          id: 999,
          name: "Updated Name",
          email: "updated@example.com",
          password: "newpassword",
        })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found.");
    });

    it("should return 500 on database error", async () => {
      mockConnection.query.mockRejectedValueOnce(new Error("Database error"));

      await request(app)
        .post("/api/update-profile")
        .send({
          id: 1,
          name: "Updated Name",
          email: "updated@example.com",
          password: "newpassword",
        })
        .expect(500);
    });
  });
});

