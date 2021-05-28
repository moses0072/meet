Feature: Show/hide event details

  Scenario: An event element is collapsed by default
    Given the user hadn’t expanded an event to see its details
    When the user opens the app
    Then the user will see a list of all the events without details

  Scenario: User can expand an event to see its details
    Given the main page was open
    When the user clicks on details button on a specific event
    Then the user will see the details of this specific event

  Scenario: User can collapse an event to hide its details
    Given an event’s details was expanded
    When the user clicks on the show less button
    Then the user will no longer see the event’s detail