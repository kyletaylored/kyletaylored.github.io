---
title: "How to install XHProf with MAMP and Drupal 7"
description: "A quick walkthrough for installing and enabling XHProf profiling in a MAMP + Drupal 7 local environment."
pubDate: 2016-04-06
category: "Web Development"
tags: ["drupal", "mamp", "performance", "profiling"]
seo: {}
---
1.  Use Homebrew
    1.  Make sure homebrew/php55 or php56 has been tapped.
    2.  brew update
    3.  brew install php56-xhprof
2.  Symlink xhprof.so to MAMP
    1.  ln -s /usr/local/Cellar/php56-xhprof/254eb24/xhprof.so /Applications/MAMP/bin/php/php5.6.10/lib/php/extensions/no-debug-non-zts-20131226/xhprof.so
3.  Edit php.ini file
    1.  At the very bottom, add
        
        \[xhprof\]
        
        extensions = xhprof.so
        
        xhprof.output\_dir=/tmp/xhprof
        
4.  Restart MAMP
5.  Enable / Install level and xhprof
    1.  drush en devel xhprof -y
6.  Check PHP Info
    1.  drupal-site/devel/phpinfo
    2.  CMD+F for “xhprof"
7.  Winning.
