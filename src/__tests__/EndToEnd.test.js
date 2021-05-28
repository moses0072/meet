 import puppeteer from 'puppeteer';

describe('show/hide an event details', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });
  
  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event-details');
    expect(eventDetails).toBeNull();
  });
});

describe('Filter events by city', () => {
  let browser;
  let page;
  
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch({ headless: false});
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });
  
  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    const events = await page.$('.event');
    expect(events).toBeDefined();
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.focus('.city')
    await page.keyboard.type('Berlin')
    let suggestions = await page.$$('.suggestions li')
    expect(suggestions).toHaveLength(2)
  });
  
  test('User can select a city from the suggested list', async () => {
    await page.waitForSelector('.suggestions li');
    await page.type(".suggestions", "Berlin, Germany");
    const suggestions = await page.$$('.suggestions li');
    expect(suggestions).toHaveLength(1);
  });
});