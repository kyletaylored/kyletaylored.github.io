---
title: "How to install XHProf with MAMP and Drupal 7"
description: "A quick walkthrough for installing and enabling XHProf profiling in a MAMP + Drupal 7 local environment."
pubDate: 2016-04-06
category: "Web Development"
tags: ["drupal", "mamp", "performance", "profiling"]
seo: {}
---
1.  Use Homebrew
    1.  Make sure `homebrew/php55` or `php56` has been tapped.
    2.  `brew update`
    3.  `brew install php56-xhprof`
2.  Symlink `xhprof.so` to MAMP

    ```bash
    ln -s /usr/local/Cellar/php56-xhprof/254eb24/xhprof.so /Applications/MAMP/bin/php/php5.6.10/lib/php/extensions/no-debug-non-zts-20131226/xhprof.so
    ```

3.  Edit `php.ini` file. At the very bottom, add:

    ```ini
    [xhprof]
    extension = xhprof.so
    xhprof.output_dir = /tmp/xhprof
    ```

4.  Restart MAMP
5.  Enable / Install devel and xhprof

    ```bash
    drush en devel xhprof -y
    ```

6.  Check PHP Info
    1.  Visit `drupal-site/devel/phpinfo`
    2.  `CMD+F` for "xhprof"
7.  Winning.
