jest.mock("knex", () => {
  return () => {
    return {
      select: jest.fn().mockReturnThis(),
      from: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      insert: jest.fn().mockReturnThis(),
      returning: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      innerJoin: jest.fn().mockReturnThis(),
      del: jest.fn(),
      then: jest.fn(),
    };
  };
});

const db = require("knex");

const bookstoresController = require("../../controllers/bookstoresController")(
  db
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe("getBookstores", () => {
  it("should return fooAllBookstores", () => {
    db().then.mockImplementation((result) =>
      expect(result).toBe("fooAllBookstores")
    );
    const result = bookstoresController.getBookstores();
  });

  it("should return null", () => {
    db().then.mockImplementation((result) => expect(result).toBe(null));
    const result = bookstoresController.getBookstores();
  });
});

describe("createBookstore", () => {
  it("should return fooBookstoreCreated", () => {
    db().then.mockImplementation((result) =>
      expect(result).toBe("fooBookstoreCreated")
    );
    const result = bookstoresController.createBookstore();
  });

  it("should return null", () => {
    db().then.mockImplementation((result) => expect(result).toBe(null));
    const result = bookstoresController.createBookstore();
  });
});

describe("getBookstoreById", () => {
  it("should return fooBookstoreId", () => {
    db.then.mockReturnValue("fooBookstoreId");
    const result = bookstoresController.getBookstoreById();
    expect(result).toBe("fooBookstoreId");
  });

  it("should return null", () => {
    db.then.mockReturnValue(null);
    const result = bookstoresController.getBookstoreById();
    expect(result).toBe(null);
  });
});

describe("getBookstoreByContent", () => {
  it("should return fooBookstoreContent", () => {
    db.then.mockReturnValue("fooBookstoreContent");
    const result = bookstoresController.getBookstoreByContent();
    expect(result).toBe("fooBookstoreContent");
  });

  it("should return null", () => {
    db.then.mockReturnValue(null);
    const result = bookstoresController.getBookstoreByContent();
    expect(result).toBe(null);
  });
});

describe("deleteBookstoreById", () => {
  it("should return fooDeleteBookstoreId", () => {
    db.then.mockReturnValue("fooDeleteBookstoreId");
    const result = bookstoresController.deleteBookstoreById();
    expect(result).toBe("fooDeleteBookstoreId");
  });

  it("should return null", () => {
    db.then.mockReturnValue(null);
    const result = bookstoresController.deleteBookstoreById();
    expect(result).toBe(null);
  });
});

describe("getBooksForBookstoreById", () => {
  it("should return fooBooksForBookstore", () => {
    db.then.mockReturnValue("fooBooksForBookstore");
    const result = bookstoresController.getBooksForBookstoreById();
    expect(result).toBe("fooBooksForBookstore");
  });

  it("should return null", () => {
    db.then.mockReturnValue(null);
    const result = bookstoresController.getBooksForBookstoreById();
    expect(result).toBe(null);
  });
});
