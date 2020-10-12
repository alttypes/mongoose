// This just ensures that the type unit tests in the type file are all
// passing

import {AUT_Tests, LeanDocument} from 'mongoose';
import {assert, UnitTests} from 'advanced-type-tests';

function assert2<T>(v: T): void {}

// Add an extra check for an issue I hit when using mongoose lean documents with strict mode enabled
assert2<null>(void 0 as unknown as LeanDocument<null>);

assert<UnitTests.Yes>(void 0 as unknown as AUT_Tests.AllTests);
