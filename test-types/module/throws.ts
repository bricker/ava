/* eslint-disable @typescript-eslint/no-empty-function */
import {expectType} from 'tsd';

import test from '../../entrypoints/main.mjs';

class CustomError extends Error {
	foo: string;

	constructor() {
		super();
		this.foo = 'foo';
	}
}

test('throws', t => {
	const error1 = t.throws(() => {});
	expectType<Error>(error1);
	const error2: CustomError = t.throws(() => {});
	expectType<CustomError>(error2);
	expectType<CustomError>(t.throws<CustomError>(() => {}));
	const error3 = t.throws(() => {}, {instanceOf: CustomError});
	expectType<CustomError>(error3);
	const error4 = t.throws(() => {}, {is: new CustomError()});
	expectType<CustomError>(error4);
	const error5 = t.throws(() => {}, {instanceOf: CustomError, is: new CustomError()});
	expectType<CustomError>(error5);
});

test('throwsAsync', async t => {
	const error1 = await t.throwsAsync(async () => {});
	expectType<Error>(error1);
	expectType<CustomError>(await t.throwsAsync<CustomError>(async () => {}));
	const error2 = await t.throwsAsync(Promise.reject());
	expectType<Error>(error2);
	expectType<CustomError>(await t.throwsAsync<CustomError>(Promise.reject()));
	const error3 = await t.throwsAsync(async () => {}, {instanceOf: CustomError});
	expectType<CustomError>(error3);
	const error4 = await t.throwsAsync(async () => {}, {is: new CustomError()});
	expectType<CustomError>(error4);
	const error5 = await t.throwsAsync(async () => {}, {instanceOf: CustomError, is: new CustomError()});
	expectType<CustomError>(error5);
});
