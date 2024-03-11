let page;

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  }, 15000);

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub: Where the world builds software · GitHub');
  }, 15000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 15000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 15000);
});

test("The Features page title.", async () => {
  const header = '.h1-mktg';
  await page.goto("https://github.com/features/");
  await page.waitForSelector(header);
  const actual = await page.$eval(header, link => link.textContent);
  console.log(actual);
  expect(actual).toEqual('The tools you need to build what you want.');
}, 15000);

test("The Pricing page title.", async () => {
  const header = '.h2-mktg';
  await page.goto("https://github.com/pricing");
  await page.waitForSelector(header);
  const actual = await page.$eval(header, link => link.textContent);
  expect(actual).toEqual('Get the complete developer platform.');
}, 15000);

test("The Marketplace page title.", async () => {
  const header = '.h1';
  await page.goto("https://github.com/marketplace");
  await page.waitForSelector(header);
  const actual = await page.$eval(header, link => link.textContent);
  expect(actual).toEqual('Extend GitHub');
}, 15000);
