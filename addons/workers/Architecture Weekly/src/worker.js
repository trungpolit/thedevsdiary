/**
 * Welcome to Cloudflare Workers!
 *
 * This is a template for a Scheduled Worker: a Worker that can run on a
 * configurable interval:
 * https://developers.cloudflare.com/workers/platform/triggers/cron-triggers/
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import * as cheerio from 'cheerio';

const SOURCE = `https://vvsevolodovich.dev`;
const FEED_PREFIX = `Architecture Weekly`;
const R2_BUCKET = `thediary`;

/**
 * Fetches the given URL and returns a Cheerio instance.
 * @param {string} url
 * @returns {Promise<cheerio.CheerioAPI>}
 */
const crawl = async (url = '') => {
	const message = `[CRAWL] Fetching ${url}`;

	const _crawl = async () => {
		let resp = await fetch(url);
		const html = await resp.text();

		return cheerio.load(html);
	};

	return profiler(message, _crawl);
};

/**
 * Logs the time it takes to execute the given function.
 * @param {string} message
 * @param {function} fn
 * @returns {Promise<*>}
 */
const profiler = async (message, fn) => {
	const timeStart = new Date();
	const result = await fn();
	const timeEnd = new Date();

	console.log(`${message} - ${timeEnd - timeStart}ms`);
	return result;
};

/**
 * Parses the given URL and returns an object with the cover and feeds.
 * @param {string} url
 * @returns {Promise<{cover: {}, feeds: *[]}>}
 */
const getWeeklyFeeds = async (url = '') => {
	const result = {
		cover: {},
		feeds: []
	};
	const $ = await crawl(url);

	const feedImgHeader = $('.post-full-image img');
	result.cover.img = {
		src: `${SOURCE}${feedImgHeader.attr('src')}`,
		alt: feedImgHeader.attr('alt'),
		srcset: feedImgHeader.attr('srcset').split(',').map(srcset => `${SOURCE}${srcset.trim()}`).join(','),
		sizes: feedImgHeader.attr('sizes')
	};

	const feedContentHeader = $('.post-full-content .post-content p:first').text();
	result.cover.content = feedContentHeader;

	const feedTitles = $('.post-full-content .post-content h3');
	const feeds = [];
	feedTitles.each(function(i, elem) {
		const title = $(this).text();
		const content = $(this).next('p').text();
		const $card = $(this).nextAll('.kg-card').first();
		const card = $card.html();

		const thumb = $card.find('.kg-bookmark-thumbnail img').attr('src');
		const url = $card.find('a').attr('href');

		feeds[i] = {
			title,
			content,
			card,
			thumb,
			url
		};
	});
	result.feeds = feeds;

	return result;
};

const handle = async (event, env, ctx) => {
	const $ = await crawl(SOURCE);

	const postFeeds = $('.post-feed .post-card');
	const lastWeeklyPost = postFeeds.find(`a:contains("${FEED_PREFIX}")`).first();

	const lastWeeklyPostTitle = lastWeeklyPost.find('.post-card-title').text();
	const lastWeeklyPostUrl = `${SOURCE}${lastWeeklyPost.attr('href')}`;


	const lastWeeklyFeeds = await profiler('[PARSER] Parse and get weekly feeds', () => getWeeklyFeeds(lastWeeklyPostUrl));
	const lastWeeklyFeedsJson = JSON.stringify(lastWeeklyFeeds);


	const lastWeeklyFeedR2Key = `${FEED_PREFIX.toLowerCase().replace(/\s/g, '-')}.json`;
	const archivedWeeklyFeedR2Key = `${lastWeeklyPostTitle.toLowerCase().replace(/\s/g, '-')}.json`;

	await profiler(`[UPLOAD] Upload weekly feeds to R2 key: ${lastWeeklyFeedR2Key}`, () => env[R2_BUCKET].put(lastWeeklyFeedR2Key, lastWeeklyFeedsJson, {
		httpMetadata: {
			contentType: 'application/json'
		}
	}));
	await profiler(`[UPLOAD] Upload weekly feeds to R2 key: ${archivedWeeklyFeedR2Key}`, () => env[R2_BUCKET].put(archivedWeeklyFeedR2Key, lastWeeklyFeedsJson, {
		httpMetadata: {
			contentType: 'application/json'
		}
	}));

	return new Response(lastWeeklyFeedsJson);
}

export default {
	async fetch(event, env, ctx) {
 		return handle(event, env, ctx);
	},

	async scheduled(event, env, ctx) {
		return handle(event, env, ctx);
	},
};
