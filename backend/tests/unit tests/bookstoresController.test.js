const db = require("knex");

jest.mock("knex", () => ({
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  del: jest.fn(),
  then: jest.fn(),
}));

const bookstoresController = require("../../controllers/bookstoresController")(
  db
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getBookstores", () => {
  it("should return foo", () => {
    db.then.mockReturnValue("foo");
    const result = bookstoresController.getBookstores();
    expect(result).toBe("foo");
  });

  it("should return null", () => {
    db.then.mockReturnValue(null);
    const result = bookstoresController.getBookstores();
    expect(result).toBe(null);
  });
});
