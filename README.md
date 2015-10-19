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

Harp and Github pages makes deploying to production *really* easy.

1. Run `npm run compile` to compile the source in the `/public` directory in the `/www` directory.

2. Commit and push changes to the orphaned `gh-pages` branch
```bash
$: cd www
$: git add .
$: git commit -m "message"
$: git push origin gh-pages
```

**Note**: The `/www` directory is a submodule pointing the `gh-pages` orphan branch. This is just an easy way to handle deployment without having to constantly switch branches.  See [this blog post](http://blog.revathskumar.com/2014/07/publish-github-pages-using-git-submodules.html) for more details.
