If you're publishing your HarpJS sites to Github pages, then you've probably seen the Github deployment instructions in [the official HarpJS docs](http://harpjs.com/docs/deployment/github-pages).  And if you're the kind of person that prefers using dependency managers (like Bower) to take care of your external assets, then you'd have run into a hot mess with the "official" Github deployment approach.

#### What mess?

The Harp docs suggest putting your site's source files in a `_harp` folder just under the project root.  If you're following the docs *and* using Bower, you'd have a project directory looking like so...

```markup
myapp/
  |- .bowerrc
  |- bower.json  
  +- _harp/
    |- bower_components/  
    +- blog/
      |- post1.md    
    |- index.ejs
    |- harp.json
```

Then according to the docs, you'd compile your source to static files by running
```bash
$: harp compile _harp ./
```  

This places generated files into the project root directory, which now ends up looking like...

```markup
myapp/
  |- _harp/
  |- index.html      <--- compiled from _harp/index.ejs
  +- blog/           <--- compiled from _harp/blog/
    +- post1.html    <--- compiled from _harp/blog/post1.md
```


The problem is that `harp compile _harp ./` cleans out *everything* in the root directory save for the `_harp` folder and your `.git*` files.  This also means your `bower.json`, `package.json`, and/or other config files get purged.  =(

#### Workaround

You can get around this in a few ways:

1. utilize an orphaned `gh-pages` branch; or
2. create two separate repositories - one for source, one to publish the compiled site

Either way, you're doing the "`cp -r` shuffle", with files flying back and forth between temp directories.  This is a major annoyance.

#### The Better Way - Git Submodules

Whoa, whoa, whoa!  Git Submodules, are you crazy?!  

Yes, I know [how evil submodules](http://slopjong.de/2013/06/04/git-why-submodules-are-evil/) can be, but in this case they're a great solution. This blog post is actually inspired by [Revath Kumar's post](http://blog.revathskumar.com/2014/07/publish-github-pages-using-git-submodules.html) on publishing a project site to an orphaned `gh-pages` branch on Github using submodules.  

##### Let's Start

For the sake of this tutorial, let's assume your git repo hasn't been initialized yet.

1. Setup your repo at github and initialize the `master` branch on `remote`

2. While still in `master`, create an orphaned `gh-pages` branch
```bash
$: git checkout --orphan gh-pages
```

3. If you run a `git status` you'll see git has staged all your files for commit.  You **don't** really want to commit these, so delete all the files save for the `.git*` ones.

4. Initialize the upstream `gh-pages` branch by pushing up an empty file.  This can be a `README` or whatever.  You might also need to run `git push --set-upstream origin gh-pages` if you run into errors.

5. Switch back to your `master` branch with a `git checkout master`

6. Attach the `gh-pages` branch as a submodule to the Harp compile directory
```bash
$: git submodule add -b gh-pages git@github.com:username/reponame.git www
```
I'm using `www` for the target directory for the compiled files because that's what `harp compile` defaults to. You can set `www` to whatever directory you want.

7. Now when you're in the `www` directory, you'll see that it's part of `gh-pages` orphaned branch.

```bash
# in project root directory
$: git status
On branch master

$: cd www
$: git status
On branch gh-pages
```

&nbsp;

#### Compiling and publishing to production

Easy!

```bash
$: harp compile

# static files will now be in /www
$: cd www

# /www is on branch gh-pages
$: git add .
$: git commit -m "Message"
$: git push origin gh-pages
```

If you take a look at the `gh-pages` branch on your Github repo (using your browser), you should see your compiled code has been pushed up.  It should also be available to view through the project site.

&nbsp;

#### Protips

**1. Install Harp and Bower locally using NPM **

This allows team members to spin up the project without the need for global dependencies.

**2. Use NPM to set up your run and compile scripts**

Again, this is mostly to help team members get started.  
```js
// package.json
...
"scripts": {
    "compile" : "./node_modules/harp/bin/harp compile"
}
```

Now you can run `npm run compile` to build your static files.
