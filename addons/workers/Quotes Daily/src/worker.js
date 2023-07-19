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
import md5 from 'md5';

const RANDOM_QUOTES = `https://zenquotes.io/api/quotes`;
const TODAY_QUOTES = `https://zenquotes.io/api/today`;
const R2_BUCKET = `thediary`;
const R2_TODAY_KEY = `quotes-today.json`;
const R2_DATA_KEY = `quotes-data.json`;

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

const request = async (url = '') => {
	const message = `[REQUEST] Fetching ${url}`;
	const _request = async () => {
		let resp = await fetch(url);
		return await resp.json();
	};

	return profiler(message, _request);
};


const handle = async (event, env, ctx) => {
	const today = (await request(TODAY_QUOTES))[0] || {};

	await profiler(`[UPLOAD] Upload today quotes to R2 key: ${R2_TODAY_KEY}`, () => env[R2_BUCKET].put(R2_TODAY_KEY, JSON.stringify(today), {
		httpMetadata: {
			contentType: 'application/json'
		}
	}));

	const random = await request(RANDOM_QUOTES) || [];
	const r2_data = await env[R2_BUCKET].get(R2_DATA_KEY);
	const data = r2_data ? await r2_data.json() : {};

	const today_hash = md5(today.q);
	data[today_hash] = today;

	random.forEach((quote) => {
		const hash = md5(quote.q);
		data[hash] = quote;
	});

	await profiler(`[UPLOAD] Upload data quotes to R2 key: ${R2_DATA_KEY}`, () => env[R2_BUCKET].put(R2_DATA_KEY, JSON.stringify(data), {
		httpMetadata: {
			contentType: 'application/json'
		}
	}));

	return new Response(JSON.stringify(today));
};

export default {
	async fetch(event, env, ctx) {
		return handle(event, env, ctx);
	},

	async scheduled(event, env, ctx) {
		return handle(event, env, ctx);
	}
};
