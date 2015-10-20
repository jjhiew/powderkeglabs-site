If you're publishing your HarpJS sites to Github pages, then you've probably seen the Github deployment instructions in [the official HarpJS docs](http://harpjs.com/docs/deployment/github-pages).

If you're the kind of person that prefers using dependency managers (like Bower) to take care of your external assets, then you'd have run into a hot mess using the "official" Github deployment approach.

#### What mess?

The Harp docs suggest putting your source files in a `_harp` folder under the project root.  Then to compile to static files, you'd run...

```bash
harp compile _harp ./
```

...which places the built files into root.  The problem is that `harp compile _harp ./` cleans out *everything* in the root directory save for the `_harp` folder and your `.git*` files (`bower.json`, `package.json`, and/or other config files).

#### Solutions

You can get around this in a few ways:
1. utilize an orphaned `gh-pages` branch in the project repository; or
2. create two repositories - one for the source, one to publish the compiled site;

Either way, you're doing the "`cp -r` shuffle" with files going back and forth between temp directories.  This is a major annoyance.

#### The Better Way - Git Submodules

Whoa, whoa, whoa!  Git Submodules, are you crazy?!  

Yes, I know [how evil submodules](http://slopjong.de/2013/06/04/git-why-submodules-are-evil/) can be, but in this case they're a perfect solution. This post is actually inspired by [Revath Kumar's post](http://blog.revathskumar.com/2014/07/publish-github-pages-using-git-submodules.html) on publishing to an orphan `gh-pages` branch on Github.  

##### Let's Start

For the sake of this tutorial, let's assume your git repo hasn't been initialized yet.

1. Setup your repo at github initialize `master` on the remote branch

2. Create an orphan `gh-pages` branch
```bash
$: git checkout --orphan gh-pages
```

3. If you run a `git status` you'll see all your files automatically staged for commit.  You **don't** want to commit these, so delete all the files save for the `.git*` ones.

4. Initialize the upstream `gh-pages` branch by pushing up an empty file.  This can be a `README` or whatever.  You might also need to run
```bash
$: git push --set-upstream origin gh-pages
```

5. Switch back to your `master` branch
```bash
$: git checkout master
```

6. Attach the `gh-pages` branch as a submodule to the Harp compile directory
```bash
$: git submodule add -b gh-pages git@github.com:username/reponame.git www
```
We use `www` for the target directory for the compiled files because that's what `harp compile` defaults to. You can set `www` to whatever directory you want.

7. Now when you're in the `www` directory, you'll see that it's part of `gh-pages` branch.

```bash
# in project root directory
$: git status
On branch master

$: cd www
$: git status
On branch gh-pages
```

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

Now take a look at the `gh-pages` branch on your Github repo and you should see your compiled code pushed.

Done.


#### Protips

These are mostly just stylistic / best practices...

1. Use NPM to install HarpJS and Bower locally. This allows team members to spin up the project without the need for global dependencies.

2. Add a run script to your `package.json` file and use npm to compile for you.
```js
// package.json
...
"scripts": {
    "compile" : "./node_modules/harp/bin/harp compile"
}
```
Now you can run `$: npm run compile` to build your static files.
