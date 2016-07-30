# PowderKeg Labs Site

Herein contains the source code for the [powderkeglabs.com](http://powderkeglabs.com) website.

The site uses a [HarpJS](http://harpjs.com), a site generator to compile the source into static HTML.  It also uses Bower and NPM for dependencies.

The hosting is done through [GitHub Pages](http://pages.github.com) (look at the `gh-pages` branch).



## Do Development...

1. Clone this repo.  

2. Run `npm install` to install dependencies.  

3. Run `harp server` to start the server. It'll be available at `http://localhost:9000`.

4. You can now make changes to the source in the `/public` folder and Harp will automatically recompile.


## Deploying

Because of the static nature of this site, hosting is done through AWS S3 and Cloudfront.  We use Harp and Gulp to publish the statically generated pages.

1. Run `npm run compile` to compile the source in the `/public` directory into the `/www` directory.

2. Publish to S3 with Gulp. Note, you must set up AWS credentials and policies as per the [Node AWS-SDK docs](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html).
```bash
$: S3_REGION=<YOUR_REGION> S3_BUCKET=<YOUR_BUCKET> gulp publish
```
*Note: It's suggested that you create a `.env` file with your Bucket and Region config*

## Changelog

**2016-07-29:** Switch to publishing with Gulp and S3

License
-------
MIT
