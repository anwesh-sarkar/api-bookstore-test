Feature: Login
  Scenario: Successful login
    Given the user has email and password
    When the user logs in
    Then the user must be receive a token

# Scenario: Create a book
#   When the user sends title as "Testing the Test Life"
#   And the author as "Testers McTesterson"
#   And the summary as "Bing Bang Bong Sing Sang Song"
#   Then the book must get added to the Books database

# Scenario: Add book to bookstore
#   When the user posts the book with quantity 5 to bookstore with id 1
#   Then the book must be added to the Bookstores_books database

# Scenario: Update quantity of book in bookstore to 0
#   When the user updates the quantity of the book to 0
#   Then the quantity on the Bookstores_books database must be 0

# Scenario: Get status of book in the bookstore
#   When the user requests the status of the book in the bookstore
#   Then the book status in the bookstore must be returned