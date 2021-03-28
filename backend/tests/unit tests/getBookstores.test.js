const getBookstores = require("../../controllers/bookstoresController");
const { Client } = require("pg");

// jest.mock("pg", () => {
//   // const bookstores = jest.fn();
//   const mClient = {
//     select: db.mockReturnValue("select"),
//     from: jest.fn().mockReturnValue(),
//     orderBy: jest.fn().mockReturnValue(),
//     then: jest.fn((done) => done(null)),
//   };
//   return { Client: jest.fn(() => mClient) };
// });

describe("getBookstores", () => {
  // db.mockReturnValue(bookstores);
  // let client;
  // beforeAll(() => {
  //   client = new Client();
  // });
  // afterAll(() => {
  //   jest.clearAllMocks();
  // });
  const db = jest.fn();
  const select = db.mockReturnValue("*");
  const from = db.mockReturnValueOnce("bookstores");
  const orderBy = db.mockReturnValueOnce("id");
  // const then = db.then((done) => done(null));

  it("something should happen", () => {
    // expect(db()).toBe("id");
    expect(select()).toBe("*");
  });
});
