---
layout: post
title: "JavaScript testing with AVA – ES6"
author: Colin Tester
summary: Adding the AVA test runner to a project which uses ES6 modules.
headerImage: javascript-testing-with-ava-header.jpg
---

Setting up a JavaScript testing environment can be a complex process; there is much to learn and numerous tools that need loading and configuring manually. [AVA – the JavaScript test runner](https://github.com/avajs/ava) – offers a much simpler test API with a minimal amount of setting up.

In this post I wish to demonstrate how simple – relatively speaking – it is to get AVA up and running tests on a simple example ES6 module (example-module.js) which implements a simple interface to interact with a browser <abbr title="Document Object Model">DOM</abbr>.

In my project working folder I have two sub-folders, labelled: <em>src</em> and <em>tests</em> to hold, respectively, our JavaScript source file and test file.

- ./src/example-module.js
- ./tests/example-module-test.js

### Installing AVA and supporting dependencies.

AVA is a test runner for Node.js so we will install the required modules using [npm](https://www.npmjs.com/get-npm). I am assuming that npm is installed already and initialised for this project.

We want to load AVA and Babel as our project dev dependencies, with additional support to compile our ES6 written source files.

{% highlight cli %}
$ npm install --save-dev ava @babel/core @babel/preset-env @babel/register
{% endhighlight %}

### Babel configuration.

With the AVA and Babel modules installed, we will next create a `.babelrc` file and save it into the project's root folder. Within the `.babelrc` file we will set the <em>preset</em> that Babel should use when compiling our source files.

{% highlight json %}
{
  "presets": [
    "@babel/preset-env"
  ]
}
{% endhighlight %}

### AVA configuration.

[AVA operational options](https://github.com/avajs/ava/blob/master/docs/06-configuration.md) can be set within the project's <strong>package.json</strong> file. We want to inform AVA where our test files and source files are located.

{% highlight json %}
{
  ...
  "ava": {
    "files": [
      "tests/*-test.js"
    ],
    "sources": [
      "src/*.js"
    ],
    "failFast": true,
    "verbose": true
  }
}
{% endhighlight %}

We can also added, in the above code, [further AVA options](further AVA options) to make sure tests fail as soon as an error is encountered (failFast) and receive a more verbose test result log.

AVA does not, by default, compile ES6 source (src) files, only the test and helper files. To compile ES6 source files, we need to use Babel’s <em>register</em> module, which can also be added to the AVA configuration.

{% highlight json %}
{
  ...
  "ava": {
    ...
    "require": [
      “@babel/register"
    ]
  }
}
{% endhighlight %}

However, when using Babel’s <em>register</em> module, it will now compile not only our source files, but also the test files, which is not want we need nor is it necessary. We can inform Babel's <em>register</em> to ignore test files via an external JavaScript file.

The external file (_babel-register.js) is to be stored within our ./tests folder and the file name is prefixed with an underscore as AVA will ignore files with that prefix. The _babel-register.js file will contain the code to load (<em>require</em>) the `@babel/register` module and set the ignore option.

{% highlight javascript %}
require('@babel/register')({
  ignore: ['node_modules/*', 'tests/*']
});
{% endhighlight %}

We have now specified that @babel/register ignores all files in our <em>tests</em> folder and – for good measure – our <em>node_modules</em> folder.

Now, back within the AVA configuration; located in the <strong>package.json</strong> file, we can require and substitute our external register file to be preloaded before AVA runs any tests.

{% highlight json %}
{
  ...
  "ava": {
    ...
    "require": [
      "./tests/_babel-register.js"
    ]
  }
}
{% endhighlight %}

### Browser testing.

AVA provides currently no support for running tests in a browser. However, we can mock browser globals such as `window` and `document` in order to test DOM integrations. That mocking is assisted by using the [npm browser-env module](https://www.npmjs.com/package/browser-env).

Firstly, let's install the browser-env module.

{% highlight cli %}
$ npm install --save-dev browser-env
{% endhighlight %}

Next we create a helper file for the browser-env module and store it in our tests folder. Again, the helper file name is prefixed with an underscore so that AVA ignores the file.

Within the helper file ./tests/_browser-env.js include the following code to load (require) the `browser-env` module:

{% highlight javascript %}
const browserEnv = require('browser-env');
browserEnv(['window', 'document']);
{% endhighlight %}

By default `browser-env` will add all global browser variables to the Node global space. However, this is considered generally to be not such a good idea, therefore, we can reduce the created browser globals by specifying what's needed for the tests via an array.

In the above code, we have specified required globals for `window` and `document` only.

Finally, within the <strong>package.json</strong> file we can require that AVA preloads our helper _browser-env.js file.

{% highlight json %}
{
  ...
  "ava": {
    ...
    "require": [
      "./tests/_babel-register.js",
      "./tests/_browser-env.js"
    ]
  }
}
{% endhighlight %}

We are now ready to run AVA and as we have installed AVA locally, relative to our project folder, we need to run AVA from its location within the <em>node_modules</em> folder. This can be done in one of two ways:

1. via npx which will run a locally npm installed module as a binary executable.
2. from an npm script defined within the package.json file.

To run AVA directly from the command line with npx, type:

{% highlight cli %}
npx ava
{% endhighlight %}

We can also add the `--watch` option to our command to allow AVA to watch for changes made to our source and test files and run tests automatically.

{% highlight cli %}
npx ava --watch
{% endhighlight %}

<strong>Note:</strong> When running in <em>watch</em> mode, `CTRL + c` will stop the watching process.

However, let's follow an npm convention and also add a test script to our package.json file.

{% highlight json %}
{
  ...
  "scripts": {
    "test": "ava"
  },
  ...
}
{% endhighlight %}

We can then run the AVA tests from the command line simply with:

{% highlight cli %}
npm test

...

  ✖ Couldn't find any files to test
{% endhighlight %}

Currently, we have no tests, so let's create our example source JavaScript and some tests for it.

### Writing tests.

Create the file example-module.js and save it within the ./src folder. Add the following code to the file:

{% highlight javascript %}
'use strict';

const exampleModule = {
  view: {
    elementID: 'exampleElement'
  },

  setupView() {
    const element = buildElement();

    document.body.appendChild(element);
    this.view.element = element;
  }
};

export default exampleModule;

function buildElement() {
  const element = document.createElement('div');
  element.id = exampleModule.view.elementID;
  
  return element;
}
{% endhighlight %}

Our JavaScript example module defines a simple object <em>exampleModule</em> with a simple interface method <em>setupView</em> which will create an HTML element and insert it into the DOM, within the browser's document body element.

Next let's create a test file named example-module-test.js and save it in the ./tests folder. Add the following code to the test file:

{% highlight javascript %}
import test from "ava";
import module from "../src/example-module.js";

test('Module imported is an object', t => {
  t.is(typeof module, 'object');
});

test('Module has a view property as an object', t => {
  t.is(typeof module.view, 'object');
});
{% endhighlight %}

We are importing AVA as ‘test’ and our example module file as ‘module’. We also have two tests defined and if we now run AVA again on the command line - we should see:

{% highlight cli %}
npm test

...

  ✔ Module imported is an object
  ✔ Module has a view property as an object

  2 tests passed
{% endhighlight %}

We also need to test that our module's browser DOM integration is working, and via the browser-env module; that we set to preload before running AVA tests, we have access to a mocked browser <em>document</em> object. We can, therefore, check our module's DOM integrations just as if the module were running in a browser.

Let's add another test to our test file:

{% highlight javascript %}
test('Module has inserted an HTML element into the body element.', t => {
  module.setupView();
  
  const element = document.querySelector('#' + module.view.elementID);
  t.is(element.nodeName, 'DIV');
  t.is(module.view.element, element);
});
{% endhighlight %}

In the above test, we first call the module interface function <em>setupView</em>, and then attempt to find in the DOM, the element our module built and inserted.

Run the AVA tests again from the command line:

{% highlight cli %}
npm test

...

  ✔ Module imported is an object
  ✔ Module has a view property as an object
  ✔ Module has inserted an HTML div element into the body element.

  3 tests passed
{% endhighlight %}

As you should see we now have <em>3 tests passed</em>.

I hope that this post is helpful in getting the AVA test runner set up for your project, and please see the links below for more on AVA and the other supporting modules. I would also recommend highly learning about [test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) (TDD) as a better way to plan and implement tests for your next project.

Links:

- [AVA Writing tests](https://github.com/avajs/ava/blob/master/docs/01-writing-tests.md)
- [Babel](https://babeljs.io/)
- [browser-env](https://www.npmjs.com/package/browser-env)
