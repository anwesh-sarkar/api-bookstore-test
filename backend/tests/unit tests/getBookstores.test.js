const db = jest.mock("knex", () => {
  const mock = {
    select: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    then: jest.fn(function (done) {
      done(foo);
    }),
  };
  return jest.fn(() => mock);
});
const bookstoresController = require("../../controllers/bookstoresController")(
  db
);
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

  // const select = db.mockReturnValue("*");
  // const from = db.mockReturnValueOnce("bookstores");
  // const orderBy = db.mockReturnValueOnce("id");
  // const then = db.then((done) => done(null));

  it("something should happen", () => {
    bookstoresController.getBookstores();
    // expect(db()).toBe("id");
    // expect(select()).toBe("*");
  });
});
