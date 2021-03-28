Feature: Login
  Scenario: Successful login
    Given the user has email and password
    When the user logs in
    Then the user receives a "token"