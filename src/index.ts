// This just ensures that the type unit tests in the type file are all
// passing

import {AUT_Tests} from 'mongoose';
import {assert, UnitTests} from 'advanced-type-tests';

assert<UnitTests.Yes>(void 0 as AUT_Tests.AllTests);
