---
title: "My top 5 favorite Drupal development workflow tricks."
description: "Five workflow tricks I've picked up over years of Drupal development to make the day-to-day a little smoother."
pubDate: 2013-11-13
category: "Web Development"
tags: ["drupal", "workflow", "productivity"]
seo: {}
---
When you've been working with any platform for a long time, you start to build a relationship with that platform. For Drupal in particular, a lot of developers seem to take similar paths when it comes to building this relationship. At first, we're struck with awe as we admire the sheer power of Drupal, and then we start marching up the roller coaster some of us would call the "learning curve". We love it, we hate it, but most of all – we learn from it. After visiting the issue queue and StackOverflow for the millionth time, we start keeping a few tricks up our sleeves for the common "features" that Drupal sometimes throws at us.

These are some of the most common tricks and solutions I've pulled from the web that I use when working with Drupal, whether it's a module, drush command, or a code snippet that hopefully helps out those of you who are relatively new to Drupal.

**Undefined index: `distribution_name` in `drupal_install_profile_distribution_name()`**

If I had a nickel for every time I saw this error, I'd have some nickels. Chances are you installed a distribution and updated Drupal, and now you're getting this error. It's not anything serious, but it sure is annoying. There are two ways we can handle this:

Add the following line into `includes/install.inc`:

```php
if (!array_key_exists('distribution_name', $info)) {
  $info['distribution_name'] = 'Drupal';
}
```

If you did that, we just [killed a kitten](http://www.thecarneyeffect.co.uk/sites/default/files/assets/images/drupal-kitten.jpg) somewhere, because that's technically hacking core. We can also just [solve the issue in the database](http://adaptivethemes.com/documentation/distribution-name-notice). It's scary, I know, but it's the only way. But once it's done and cache cleared, problem solved.

Use the following MySQL command:

```sql
UPDATE `MYDATABASE`.`system` SET `status` = '1', `info` = '' WHERE `system`.`filename` = 'profiles/MYPROFILE/MYPROFILE.profile';
```

**Easily backup your database**

If you aren't using [Drush](https://github.com/drush-ops/drush) yet, now's a good time to get it set up. Drush is a magical tool we use in Drupal that helps up significantly expedite our workflow. If you're on Mac or Linux, there are multiple ways to install Drush, I prefer using Homebrew (`brew install drush`). There is also a [Windows installer](http://www.drush.org/drush_windows_installer) available as well.

As far as backing up your database, there are a multitude of ways in Drupal that you can do this. If you have a small site, the easiest way is definitely the [Backup & Migrate](https://drupal.org/project/backup_migrate) module. If you have a large Drupal site, Backup & Migrate might not work so well, so we can always revert back to the terminal.

```bash
mysqldump -u root -p[root_password] [database_name] | gzip > dumpfilename.sql
```

But if you don't have your database credentials available, just use drush!

```bash
drush sql-dump --gzip --result-file
```

An advantage to this approach is that Drush likes organize everything for you. All of our backups, including code backups during updates, are all put away into their own site directories in `~/drush-backups`.

**Working with files**

One of the biggest pains when working between a live server and your local machine is dealing with broken images. You put all your content and images on the production server, and move the database down to your local while pushing code or features back up. Unfortunately, we also have to move the files directory down so we don't have broken images locally. We can use drush rsync to move the files down, but that could be potentially a few hundred megabytes to a couple gigabytes of storage being taken up on your machine. Mark Carver had published a post on this using Apache rewrites, but there's a Drupal way we can handle this.

To ease this pain, download the [Stage File Proxy](https://drupal.org/project/stage_file_proxy) module and add the required line to your settings.php file. Stage File Proxy by default transfers only the files you need from production down to your local. Stage File Proxy also has an additional mode in which it can serve a 301 redirect to files on the server, so it's possible to see all your images without having a local files directory at all. How convenient, right?

```php
$conf['stage_file_proxy_origin'] = 'http://example.com';
```

**Local Settings.php file**

If you work in a team development environment, then this will definitely help you. We keep all of our clients projects in a central repository, and then push and pull to local machines and development or production servers, but one of the files we don't update across the environment is the settings.php file for multiple reasons.

1.  We don't want to keep database credentials in the repository, mostly for security reasons.
2.  Everyone is different. Some of us need different settings for things like varnish, error reporting, etc.

[Drupal Dork](http://brockboland.com/drupaldork/2011/11/local-settings-development-sites) has a more in-depth article on using local settings for development sites. Just add the following line to your settings.php and add local.settings.php to your repository's .gitignore so everyone can have their own copy of database settings and other configurations.

```php
@include('local.settings.php');
```

**Compare enabled modules**

Let's set the stage. You inherit a client site and take a snapshot of the database before making any changes. A few days down the road after committing a lot of updates, you finally push up to the server and realize something isn't working the way it used to – but you have no idea what happened. Were you missing some modules? Was there something in the .gitignore that you missed? Maybe there was a git submodule that wasn't included. An easy way to check is to restore the original database and compare a list of the modules enabled now and then using Drush.

```bash
drush pm-list --status=enabled --type=module --pipe > enabled_modules_now.txt
```

Do the same command for the old site and new site, then just use an online diff checker, like [DiffChecker.com](http://www.diffchecker.com/), and you'll end up seeing something like [this](http://www.diffchecker.com/nhz4otrf). Now we know what modules that were enabled that aren't now, and ones that are now that weren't then.

**Conclusion**

These are just some of my favorite Drupal workflow tricks that help in some of these general and specific situations. If you have any tips and tricks, share in the comments below!
