---
layout: post
title: "JavaScript testing with AVA – ES6"
author: Colin Tester
summary: Adding the AVA test runner to a project which uses ES6 modules.
---

Setting up a JavaScript testing environment can be a complex process; there is much to learn and numerous tools that need loading and configuring. [AVA – the JavaScript test runner](https://github.com/avajs/ava) – offers a much simpler API with a minimal amount of setting up.

In this sample project, we want to be able to test a module which implments a simple interface to interact with a browser DOM and is written in ES6.

### Installing AVA and supporting dependencies.

AVA is a test runner for Node.js so we will install the required modules using NPM. We want to load AVA and Babel, with additional support to compile our ES6 written source files, as our project dev dependencies.

{% highlight cli %}
$ npm install -save-dev ava @babel/core @babel/preset-env @babel/register
{% endhighlight %}

### Babel configuration.

With the AVA and Babel modules installed, create a `.babelrc` file (saved in the project's root folder) in which we will set the preset that Babel should use when compiling our source files.

{% highlight json %}
{
  "presets": [
    "@babel/preset-env"
  ]
}
{% endhighlight %}

### AVA configuration.

[AVA operational options](https://github.com/avajs/ava/blob/master/docs/06-configuration.md) can be set within the project's <strong>package.json</strong> file. We want to set where test files and source files can be located.

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

We can also add further options to make sure tests fail as soon as an error is encountered (failFast) and receive a more verbose test result log.

AVA does not, by default, compile ES6 source (src) files, only the test and helper files. To compile ES6 source files, we need to use Babel’s <em>register</em> module, which can be added to the AVA configuration.

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

However, when using Babel’s <em>register</em> module, it will now also compile the test files, which is not necessary. We can inform Babel's <em>register</em> to ignore test files via an external file.

The external file’s name (_babel-register.js) is prefixed with an underscore as AVA will ignore files with that prefix. The _babel-register.js file will contain the code to load the `@babel/register` module and set the ignore option.

{% highlight javascript %}
require('@babel/register')({
  ignore: ['node_modules/*', 'tests/*']
});
{% endhighlight %}

We are now ignoring all files in the <em>tests</em> folder and <em>node_modules</em> folder.

Now, back within the AVA configuration; in the <strong>package.json</strong> file, we can require the external register file is loaded before AVA runs its tests.

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

Install the browser-env module.

{% highlight cli %}
$ npm install -save-dev browser-env
{% endhighlight %}

Next we create a helper file with a name prefixed with an underscore so that AVA ignores the file as a test.

Within the helper file tests/_browser-env.js include code to load the `browser-env` module.

By default `browser-env` will add all global browser variables to the Node global space. However, this is considered generally to be not such a good idea, therefore, we can reduce the created browser globals by specifying what's needed for the tests via an array.

{% highlight javascript %}
const browserEnv = require('browser-env');
browserEnv(['window', 'document');
{% endhighlight %}

We have specified required globals for `window` and `document` only.

Finally, within the <strong>package.json</strong> file we can require the _browser-env.js file is loaded.

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

Links:

- [AVA Writng tests](https://github.com/avajs/ava/blob/master/docs/01-writing-tests.md)
- [Babel](https://babeljs.io/)
- [browser-env](https://www.npmjs.com/package/browser-env)


