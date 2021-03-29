const { defineFeature, loadFeature } = require("jest-cucumber");
const feature = loadFeature(
  "../../../integration tests/features/integration-test/integrationTest.feature",
  {
    loadRelativePath: true,
  }
);
const {
  login,
  createBooks,
  addBookToBookstore,
} = require("../../../helpers/links");
const user = require("../../../helpers/user");
const { loginOptions } = require("../../../helpers/options");
const fetch = require("node-fetch");
const userToken = require("../../../helpers/userToken");
const knex = require("knex");

defineFeature(feature, (test) => {
  let response;
  let book = {};
  let bookstore = {};
  let bookstoreBook = {};
  const jwt = new userToken();

  // beforeAll(() =>
  //   knex.migrate
  //     .rollback()
  //     .then(() => knex.migrate.latest())
  //     .then(() => knex.seed.run())
  // );

  // afterAll(() => {
  //   knex.migrate.rollback().then();
  // });

  test("Successful login", ({ given, when, then }) => {
    given("the user has email and password", () => {
      user;
    });
    when("the user logs in", async () => {
      response = await fetch(login, loginOptions).then((response) =>
        response.json()
      );
    });
    then(/^the user receives a "(.*)"$/, () => {
      jwt.setToken = response.token;
      expect(response.token).toBeString();
    });
  });

  test("Create a book", ({ when, and, then }) => {
    when(/^the user sends title as "(.*)"$/, (title) => {
      book.title = title;
    });
    and(/^the author as "(.*)"$/, (author) => {
      book.author = author;
    });
    and(/^the summary as "(.*)"$/, async (summary) => {
      book.summary = summary;

      response = await fetch(createBooks, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          authorization: jwt.token,
        },
        body: JSON.stringify(book),
      }).then((response) => response.json());
    });
    then("the book gets added to the Books database", () => {
      book.id = response.id;
      expect(response.title).toBe(book.title);
      expect(response.author).toBe(book.author);
      expect(response.summary).toBe(book.summary);
    });
  });

  test("Add book to bookstore", ({ when, then }) => {
    when(
      /^the user posts the book with quantity "(.*)" to bookstore with id "(.*)"$/,
      async (quantity, bookstoreId) => {
        book.quantity = quantity;
        bookstore.id = bookstoreId;
        response = await fetch(addBookToBookstore, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            authorization: jwt.token,
          },
          body: JSON.stringify({
            book_id: book.id,
            quantity: book.quantity,
            bookstore_id: bookstore.id,
          }),
        }).then((response) => response.json());
      }
    );
    then("the book is added to the Bookstores_books database", () => {
      expect(response.book_id).toBe(book.id);
      expect(response.bookstore_id).toBe(bookstore.id);
      expect(response.quantity).toBe(book.quantity);
    });
  });
});
