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
  statusBookstoresBooks,
  bookstoresBooks,
} = require("../../../helpers/links");
const user = require("../../../helpers/user");
const fetch = require("node-fetch");
const userToken = require("../../../helpers/userToken");
// const knexfile = require("../../../../db/knexfile");
// const db = require("knex")(knexfile[process.env.NODE_ENV]);

defineFeature(feature, (test) => {
  let response;
  let book = {};
  let bookstore = {};
  let bookstoreBook = {};
  const jwt = new userToken();

  // beforeAll(async () => {
  //   await db.migrate
  //     .latest()
  //     .then(() => db.seed.run())
  //     .catch((err) => console.log(err));
  // });

  // afterAll(() => {
  //   db.migrate
  //     .rollback()
  //     .then()
  //     .catch((err) => console.log(err));
  // });

  test("Successful login", ({ given, when, then }) => {
    given("the user has email and password", () => {
      user;
    });
    when("the user logs in", async () => {
      response = await fetch(login, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err.stack));
    });
    then("the user must be receive a token", () => {
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
      })
        .then((response) => response.json())
        .catch((err) => console.log(err.stack));
    });
    then("the book must get added to the Books database", () => {
      book.id = Number(response.id);
      expect(response.title).toBe(book.title);
      expect(response.author).toBe(book.author);
      expect(response.summary).toBe(book.summary);
    });
  });

  test("Add book to bookstore", ({ when, then }) => {
    when(
      /^the user posts the book with quantity (\d+) to bookstore with id (\d+)$/,
      async (quantity, bookstoreId) => {
        book.quantity = Number(quantity);
        bookstore.id = Number(bookstoreId);
        response = await fetch(bookstoresBooks, {
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
        })
          .then((response) => response.json())
          .catch((err) => console.log(err.stack));
      }
    );
    then("the book must be added to the Bookstores_books database", () => {
      bookstoreBook.id = response.id;
      expect(response.book_id).toBe(book.id);
      expect(response.bookstore_id).toBe(bookstore.id);
      expect(response.quantity).toBe(book.quantity);
    });
  });

  test("Update quantity of book in bookstore to 0", ({ when, then }) => {
    when(
      /^the user updates the quantity of the book to (\d+)$/,
      async (quantity) => {
        book.quantity = Number(quantity);
        response = await fetch(`${bookstoresBooks}/${bookstoreBook.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            authorization: jwt.token,
          },
          body: JSON.stringify({ quantity: quantity }),
        })
          .then((response) => response.json())
          .catch((err) => console.log(err.stack));
      }
    );
    then("the quantity on the Bookstores_books database must be 0", () => {
      expect(response.quantity).toBe(book.quantity);
    });
  });

  test("Get status of book in the bookstore", ({ when, then }) => {
    when(
      "the user requests the status of the book in the bookstore",
      async () => {
        response = await fetch(statusBookstoresBooks, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            authorization: jwt.token,
          },
        })
          .then((response) => response.json())
          .catch((err) => console.log(err.stack));
      }
    );
    then("the book status in the bookstore must be returned", () => {
      response.map((res) => {
        expect(res.id).toBe(bookstoreBook.id);
        expect(res.book_id).toBe(book.id);
        expect(res.bookstore_id).toBe(bookstore.id);
        expect(res.book_title).toBe(book.title);
        expect(res.book_author).toBe(book.author);
      });
    });
  });
});
