Feature: Ecommerce validations
    #@Validation
    Scenario: Placing the Order
    Given a login to Ecommerce2 application with "anshika@gmail.com" and "Iamking@000"
    Then Verify Error message is displayed

    @Validation
    Scenario Outline: Placing the order with different parameters
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username           |  password    |
        | anshika@gmail.com  | Iamking@000  |
        | hello@123.com      | Iamhello@12  |