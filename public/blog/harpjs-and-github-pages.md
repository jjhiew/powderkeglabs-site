If you're deploying your HarpJS sites to Github pages, then you've probably looked at  [Deploying to Github Pages](http://harpjs.com/docs/deployment/github-pages) in the HarpJS offical documentation. And if you're just building a simple site with a few custom items, then you're probably doing ok.

But you're the kind of person that prefers using dependency manager like Bower to take care of your external assets, then you'd have run into the mess the "official" approach.

#### What mess?

The Harp docs suggest putting your source files in a `_harp` folder under the root.  Then to compile, you'd run `harp compile _harp ./` which places the static files into root.  This overwrites *everything* in the root directory save for the `_harp` folder and your `.git*` files (`bower.json`, `package.json`, and/or other config files).

This site users Bower to manage Materialize, jQuery, and Prism.

#### The solution

You can get around this in a few ways:
1. utilze an orphaned `gh-pages` branch in the project repositories; or
2. create two repositories - one for the source, one to publish the compiled site;

Either way, you're doing the "`cp` shuffle" with files going to temp directories.  This is a major annoyance.


#### The Better Way - Git Submodules

Whoa, whoa whoa!  Git Submodules, are you crazy?!  

Yes, I know [how evil submodules](http://slopjong.de/2013/06/04/git-why-submodules-are-evil/), but in this case they are a godsend. The solution is actually inspired by [this post](http://blog.revathskumar.com/2014/07/publish-github-pages-using-git-submodules.html) from Revath Kumar on publishing.  It really is better, I promise.


##### Let's go

For the sake of this example, we'll assume your git repo hasn't been initialized yet.

1. Setup your repo at github, add your code to it and push to the remote `master` branch

2. Create an orphan `gh-pages` branch
```bash
$: git checkout --orphan gh-pages
```

3. If you run a `git status` you'll see basically all your files automatically staged for commit.  You actually **don't** want to commit this, so delete all the files save for the `.git*` ones.

4. Initialize the upstream `gh-pages` branch by pushing up an empty file.  This can be a `README` or whatever.  You might also need to run
```bash
$: git push --set-upstream origin gh-pages
```

5. Attach the `gh-pages` branch as a submodule to the Harp compile directory
```bash
$: git submodule add -b gh-pages <GIT_REPO_URL> <HARP_COMPILED_DIR>
```
For example:
```bash
$: git submodule add -b gh-pages git@github.com:username/reponame.git www
```
We use `www` for the compile directory because `harp compile` outputs to the `www` directory by default. But you can set it to whatever directory you want, just as long as you specify the target when you run `harp compile <target>`.

6. Now when you're in the `www` directory, you'll see it's of the `gh-pages` branch.

```bash
# in project root directory
$: git status
On branch master

$: cd www
$: git status
On branch gh-pages
```

#### Compiling and publishing to production

Just do ...
```bash
$: harp compile
$: cd www

# /www is on branch gh-pages
$: git add .
$: git commit -m "Message"
$: git push origin gh-pages
```

Now take a look at the `gh-pages` branch on your Github repo and you should see your compiled code pushed.

Done.
