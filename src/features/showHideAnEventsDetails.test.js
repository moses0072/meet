import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import EventList from '../EventList';
import Event from '../Event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  let EventListWrapper;
  let EventWrapper;
  let AppWrapper;

  test('An event element is collapsed by default', ({ given, when, then }) => {
    
    given('the user hadn’t expanded an event to see its details', () => {
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then('the user will see a list of all the events without details', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    
    given('the main page was open', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
    });

    when('the user clicks on details button on a specific event', () => {
      EventWrapper.find(".details-btn").simulate("click");
    });

    then('the user will see the details of this specific event', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
   
    given('an event’s details was expanded', () => {
      AppWrapper = mount(<App />);
      EventListWrapper = mount(<EventList events={mockData} />);
      EventWrapper = mount(<Event event={mockData[0]} />);
      EventWrapper.find(".details-btn").simulate("click");
      EventWrapper.find(".event-details");
    });

    when('the user clicks on the show less button', () => {
      EventWrapper.find(".details-btn").simulate("click");
    });

    then('the user will no longer see the event’s detail', () => {
      expect(EventWrapper.find(".event-details")).toHaveLength(0);
    });
  });
});