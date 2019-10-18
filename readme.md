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

- [wegood](#wegood)
  - [About](#about)
  - [Installation via NPM or Yarn](#installation-via-npm-or-yarn)
  - [Basic Usage](#basic-usage)
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