Powder Keg Labs Site - Development Code
=======================================

Herein lies the code for our website at www.powderkeglabs.com.  It's a simple web app created using the [Polymer](http://www.polymer-project.org) framework by Google.

The project has been scaffolded with [Yeoman](http://yeoman.io) and [generator-polymer](https://github.com/yeoman/generator-polymer).


Get the project going!
----------------------

```bash
  $: git clone https://github.com/powderkeglabs/powderkeglabs-site.git
  $: cd powderkeglabs-site
  $: npm install
  $: bower update

  # To run the site on your machine
  $: grunt serve
```

Building for production
-----------------------

Run `grunt` in your terminal.  This will build the site and dump all the files in the `dist` folder.

Copy and deploy the contents of the `dist` folder to your web server.  In our case, we use Github to host the site at http://powderkeglabs.github.io, which means we copy it to another repository and push the code via Git.

License
-------
MIT

Authored by JJ Hiew
