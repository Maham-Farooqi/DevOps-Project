const mysql = require("mysql2/promise");

// Mock mysql2/promise before requiring the app
jest.mock("mysql2/promise");

const mockConnection = {
  query: jest.fn(),
};

// Mock createConnection to return our mock connection
mysql.createConnection = jest.fn().mockResolvedValue(mockConnection);

// Mock console methods to avoid test output noise in CI/CD
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
};

// Set up environment variables (required for CI/CD)
process.env.DB_HOST = "localhost";
process.env.DB_USER = "test";
process.env.DB_PASSWORD = "test";
process.env.DB_NAME = "test";
process.env.NODE_ENV = "test";

// Mock Express app.listen before requiring the server to prevent port conflicts
const express = require("express");
express.application.listen = jest.fn(function (port, callback) {
  if (callback) callback();
  return { close: jest.fn() };
});

// Export shared mocks and app
// Note: The connectWithRetry function in mysqlserver.js will attempt to connect,
// but since mysql.createConnection is mocked, it will resolve immediately
// and won't cause issues in CI/CD pipelines
const app = require("../mysqlserver");

// Ensure mockConnection is available globally for all tests
module.exports = {
  app,
  mockConnection,
};

