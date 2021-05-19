# MeetApp Key Featuers

# Objective

To build a serverless, progressive web application (PWA) with React using a test-driven development(TDD) technique. The application uses the Google calander API to fetch upcoming events.

### Key Features:

1.	It must be able to show/hide an event’s details.
2.	It must specify the number of event.
3.	It must be available offline.
4.	It must display a chart showing the number of upcoming events by city.

## User Stories and Gherkin language:

#### User story feature 1:

*As a* user

*I should be able to* show/hide event details 

*So that* I can see more/less information about an event


### Feature 1: Show/Hide an event’s Details

**Scenario 1:** An event element is collapsed by default.

**Given** the user hadn’t expanded an event to see its details

**When** the user opens the app

**Then** the user will see all events without details

  
**Scenario 2:** User can expand an event to see ist details.

**Given** the main page was open

**When** the user clicks on details button on a specific event

**Then** the user will see the details of this specefic event


**Scenario 3:** User can collapse an event to hide ist details.

**Given** an event’s  detail was expended

**When** the user clicks on show less button

**Then**  the user will no longer see the event’s detail


#### User story feature 2:

*As a* user

*I should be able to* specify the number of events i want to view

*So that* I can see less or more events


### Feature 2: specify the number of events:

**Scenario 1:** When user hasn’t specified a number, 32 is the default number.

**Given** the user hadn’t specified any number

**When** when the main page is open

**Then**  the number of events will be 32


**Scenario 2:** User can change the number of events they want to see.

**Given** 32 events was showed to the user

**When** the user changes the number of events they want to see

**Then** the user will see the number of events that been chosen


#### User story feature 3:
*As a* user

*I should be able to* use the app when offline

*So that* I can see the events i viewed the the last time i was online


### Feature 3: Use the app when offline:

**Scenario 1:** Show cashed data when there’s no internet connection.

**Given** there was no internet connection

**When** when the user opens the app while offline

**Then** the app will show the cashed data


**Scenario 2:** Show error when user changes the settings (city, time range).

**Given** there was no internet connection 

**When** the user changes the setting

**Then** the app will show an error


#### User story feature 4:

*As a* user

*I should be able to* see a chart showing the upcoming events in each city

*So that* i know what events are in which city


### Feature 4: Data Visualization:


**Scenario 1:** Show a chart with the number of upcoming events in each city.

**Given** the user looked for the number of events in each city

**When** the user opens the event chart 

**Then**  the user will see a chart with the number of upcoming events in each city


