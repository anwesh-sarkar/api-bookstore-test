Feature: Login
  Scenario: Successful login
    Given the user has email and password
    When the user logs in
    Then the user receives a "token"

  Scenario: Create a book
    When the user sends title as "Testing the Test Life"
    And the author as "Testers McTesterson"
    And the summary as "Bing Bang Bong Sing Sang Song"
    Then the book gets added to the Books database

  Scenario: Add book to bookstore
    When the user posts the book with quantity "5" to bookstore with id "1"
    Then the book is added to the Bookstores_books database