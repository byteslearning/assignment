describe('HTML5 Structure Test', () => {
  beforeAll(async () => {
    await page.goto('file://' + __dirname + '/../index.html'); // Path to the student's index.html
  });

  test('should have a <!DOCTYPE html>', async () => {
    const doctype = await page.evaluate(() => document.doctype.name);
    expect(doctype).toBe('html');
  });

  test('should have an <html> tag with a lang attribute', async () => {
    const langAttr = await page.evaluate(() => document.documentElement.getAttribute('lang'));
    expect(langAttr).not.toBeNull();
  });

  test('should have a <head> tag', async () => {
    const hasHead = await page.$('head');
    expect(hasHead).not.toBeNull();
  });

  test('should have a <body> tag and non-empty <h1> tag inside the <body>', async () => {
    const body = await page.$('body');
    const h1 = await page.$('body > h1');

    expect(body).not.toBeNull();
    expect(h1).not.toBeNull();
    expect(await h1.evaluate(node => node.textContent)).toBeTruthy();
  })

  test('should have a <meta charset="UTF-8"> in the <head>', async () => {
    const metaCharset = await page.$('meta[charset="UTF-8"]');
    expect(metaCharset).not.toBeNull();
  });

  test('should have correct viewport meta tag', async () => {
    const hasViewportMeta = await page.evaluate(() => {
      const meta = document.querySelector('meta[name="viewport"]');
      return meta !== null && meta.getAttribute('content') === 'width=device-width, initial-scale=1';
    });
    expect(hasViewportMeta).toBe(true); // Ensure the element and content are correct
  });

  test('should have a non-empty <title> tag inside the <head>', async () => {
    const title = await page.$('head > title');

    expect(title).not.toBeNull();
    expect(await title.evaluate(node => node.textContent)).toBeTruthy();
  });
});
