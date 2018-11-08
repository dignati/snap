import puppeteer from 'puppeteer';
import restyleQuery from '../styling/query';
import config from 'config';

const baseUrl = config.get('redash.baseUrl');

export async function queryPng(queryId, visualizationId, apiKey) {
  // eslint-disable-next-line max-len
  const url = `${baseUrl}/embed/query/${queryId}/visualization/${visualizationId}?api_key=${apiKey}`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({width: 900, height: 50});
  await page.goto(url, {waitUntil: 'networkidle0'});
  await page.evaluate(restyleQuery);

  const data = await page.screenshot({fullPage: true});
  await page.close();
  return data;
}
