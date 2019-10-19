# wegood
Tiny validation library, so wegood with data.

> Revision: October 18, 2019.

## About
This project has been developed to provide a shared validation logic between front-end and back-end code, easily extend-able with custom rules.

* It is unit tested with 100% code coverage.
* Easily localized validation messages.
* Plug & play custom validation rules.
* Not dependent on any library.
* Readable and declarative validation rules.

> The library is being build as CommonJS module and ESM.

> Code documentation could be found here: https://briza-insurance.github.io/wegood/index.html.

## Installation via NPM or Yarn
```sh
npm install -D @briza/wegood
```
```sh
yarn add @briza/wegood -D
```

**Table of Content**

---

- [Basic Usage](#basic-usage)
- [Builtin Validation Rules](#builtin-validation-rules)
  - [Equal](#equal)
  - [Pattern](#pattern)
  - [Range](#range)
  - [Length](#length)
  - [Exclude](#exclude)
  - [Include](#include)
  - [Date](#date)
- [Contributing](#contributing)
  - [Pull Request Process](#pull-request-process)
- [License](#license)

---

## Basic Usage
```js
// Import the Validator.
import Validator from '@briza/wegood';

// Import some of the predefined validation rules.
import {
  equal,
  length,
  pattern,
} from '@briza/wegood';

/**
 * Create a new instances of the validator with given rules.
 */

const equalValidator = new Validator([
  equal('The value must be 5.', 5)
]);

const idValidator = new Validator([
  length('The value must 9 characters long.', 9, 9),
  pattern('The value must be in A000-0000 format, where 0 could be any number', /^A\d{3}-\d{4}$/)
]);

/**
 * Use one of the validation methods.
 */

// Return true if valid,
// error message of the first not-satisfied rule otherwise.
equalValidator.validate(1);

// Return true if valid,
// array of error messages of all not-satisfied rules otherwise.
idValidator.validate('a1234-4', false /* firstErrorOnly */);

// Return true if valid, false otherwise.
equalValidator.valid(1);

// Return null if there is no error,
// error message of the first not-satisfied rule otherwise.
equalValidator.error(1);

// Return null if there is no error,
// array of error messages of all not-satisfied rules otherwise.
idValidator.errors('a1234-4');
```

## Builtin Validation Rules
All builtin validation rules have this construct:
```typescript
function rule(errorMessage: string, agr1: any, ... argN: any): (value: any) => true|false
```
- A function which returns the validation rule function with set error message, plug-able into the Validator, or it could be used individually, e.g. ```rule('error message')(testValue)```.
- The args differs form rule to rule.

### Equal
Verify that the tested value is equal to another.
```js
import { equal } from '@briza/wegood';
```

**Function Arguments**
```typescript
equal(errorMessage, value|customMatcher)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'the value must be 5' |
| value | The equal value. | 5 |
| customMatcher | Custom equality predicate function. | ```(value) => value === 5``` |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_equal_.html).

**Example**
```typescript
// The value must be equal to 5.
equal('error message', 5);

// Custom matcher.
equal('error message', (value) => {
  return value === 5;
});
```

### Pattern
Verify that the tested value is matches the pattern.
```js
import { pattern } from '@briza/wegood';
```

**Function Arguments**
```typescript
pattern(errorMessage, rx)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'invalid email format' |
| rx | Regular expression used to validate the value. | ```/^[^@]+@.*\.[a-z]{2, 5}$/``` |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_pattern_.html).

**Example**
```typescript
// The value must match the given pattern.
pattern('error message', /^[^@]+@.*\.[a-z]{2, 5}$/);
```

### Range
Verify that the tested value is in the given range.
- Applicable only on the number values, although the rule auto-converts string into number if it is a valid number.
- Could be also used as MAX and MIN.
```js
import { range } from '@briza/wegood';
```

**Function Arguments**
```typescript
range(errorMessage, min, max)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'the value must be in range 3-10' |
| min | Minimal boundary. If set to ```undefined``` or ```null```, it is being ignored. | 3 |
| max | Maximal boundary. If set to ```undefined``` or ```null```, it is being ignored. | 10 |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_range_.html).

**Example**
```typescript
// The value must be between 3 and 10.
range('error message', 3, 10);

// The value must be 3 and above, aka MIN.
range('error message', 3);

// The value must be 10 and bellow, aka MAX.
range('error message', null|undefined, 10);
```

### Length
Verify that the tested value is in the given string length range.
- Applicable only on the string values, although the rule auto-converts numbers into strings.
- Could be also used as MAX and MIN.

```js
import { length } from '@briza/wegood';
```

**Function Arguments**
```typescript
length(errorMessage, min, max)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'the value must be 3-10 characters long' |
| min | Minimal length. If set to ```undefined``` or ```null```, it is being ignored. | 3 |
| max | Maximal length. If set to ```undefined``` or ```null```, it is being ignored. | 10 |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_length_.html).

**Example**
```typescript
// The value must be 3 up to 10 characters long.
length('error message', 3, 10);

// The value must be 3 and more characters long, aka MIN.
length('error message', 3);

// The value must be 10 and less characters long, aka MAX.
length('error message', null|undefined, 10);
```

### Exclude
Verify that the tested value is not the exclusion list.
```js
import { exclude } from '@briza/wegood';
```

**Function Arguments**
```typescript
exclude(errorMessage, exclusions)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'invalid value' |
| exclusions | Array of exclusions. | ```[1,2,3]``` |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_exclude_.html).

**Example**
```typescript
// The value must not be contained in the list.
exclude('error message', [1, 2, 3]);

// The value must not be contained in the list.
exclude('error message', ['circle', 'square', 'triable']);
```

### Include
Verify that the tested value is not the exclusion list.
```js
import { include } from '@briza/wegood';
```

**Function Arguments**
```typescript
include(errorMessage, inclusions)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'invalid value' |
| inclusions | Array of inclusions. | ```[1,2,3]``` |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_include_.html).

**Example**
```typescript
// The value must be contained in the list.
include('error message', [1, 2, 3]);

// The value must be contained in the list.
include('error message', ['circle', 'square', 'triable']);
```

### Date
Verify that the tested value is the date range.
```js
import { date } from '@briza/wegood';
```

**Function Arguments**
```typescript
date(errorMessage, start, end, transform)
```

| Argument | Notes | Example |
| --- | --- | --- |
| errorMessage | Error message. | 'the date in not in valid range.' |
| start | Start date boundary - ```ISO date string``` (yyyy-mm-dd), ```Date object```, or [Relative Date Offset](#relative-date-offset). If set to ```undefined``` or ```null```, it is being ignored. | 3 |
| end | End date boundary - ```ISO date string``` (yyyy-mm-dd), ```Date object```, or [Relative Date Offset](#relative-date-offset). If set to ```undefined``` or ```null```, it is being ignored. | 3 |
| transform | Custom Date object transformer function. Optional. | ```(value) => new Date(value)``` |

> [Code documentation](https://briza-insurance.github.io/wegood/modules/_rule_date_.html).

#### Relative Date Offset
Instead of a concrete ISO date string or Date object below annotated shortcodes might be used to set the date boundary relative to TODAY date.

| Annotation | Meaning | Example |
| -- | -- | -- |
| 0 | Today. | 0 |
| -1 | In past. | -1 |
| 1 | In future. | 1 |
| -Nd | N days in past, relative from today. | -10d | 
| Nd | N days in past, relative from today. | 10d | 
| -Nw | N weeks in past, relative from today. | -2w | 
| Nw | N weeks in past, relative from today. | 2w | 
| -Nm | N months in past, relative from today. | -6m | 
| Nm | N months in past, relative from today. | 6m | 
| -Ny | N years in past, relative from today. | -2y | 
| Ny | N years in past, relative from today. | 2y | 

**Example**
```typescript
/**
 * The value (date) must between the given data range.
 */
// ISO strings
date('error message', '2000-12-30', '2020-06-29');
// Date objects
date('error message', new Date('2000-12-30T00:00:00+0000'), new Date('2020-06-29T00:00:00+0000'));

/**
 * The value (date) must after the date.
 */
// ISO string
date('error message', '2000-12-30');
// Date object
date('error message', new Date('2000-12-30T00:00:00+0000'))

/**
 * The value (date) must before the date.
 */
// ISO string
date('error message', undefined|null, '2020-06-29');
// Date object
date('error message', undefined|null, new Date('2020-06-29T00:00:00+0000'))

/**
 * Relative offsets, relative to today.
 */

// Any date in past, until today.
date('error message', -1, 0);

// Any date in future, starts from today.
date('error message', 0, 1);

// Any date between 2 years ago, up to 3 months from today.
date('error message', '-2y', '3m');

// Combined fixed date with relative date.
// Any date from 2000-12-30 until today.
date('error message', '2000-12-30', 0);

```

---

## Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

### Pull Request Process
1. Fork it
2. Create your feature branch (git checkout -b ft/new-feature-name)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin ft/new-feature-name)
5. Create new Pull Request
> Please make an issue first if the change is likely to increase.

## License
Illogical is released under the MIT license. See [LICENSE.txt](https://github.com/briza-insurance/wegood/blob/master/LICENSE.txt).