---
title: "Managing your DrupalVM Environment: Vagrant Plugins and SED Scripts"
description: "In our last post, we talked about how great DrupalVM is by providing Drupal developers a robust development environment that can be used with multiple types of applications. And while the installation process is fairly straight forward, it can take some trial and error in updating your config.yml file for the perfect hosting environment. Are you managing multiple virtual machines for multiple client project? This can take up a significant amount of space on your computer’s resources (RAM and hard drive space). This post will walk you through how we addressed some of these common problems to optimize your DrupalVM environments."
pubDate: 2018-01-02
category: "Web Development"
tags: ["drupal", "drupalvm", "vagrant", "devops"]
seo: {}
---
In our last post, we talked about how great DrupalVM is by providing Drupal developers a robust development environment that can be used with multiple types of applications. And while the installation process is fairly straight forward, it can take some trial and error in updating your config.yml file for the perfect hosting environment. Are you managing multiple virtual machines for multiple client project? This can take up a significant amount of space on your computer’s resources (RAM and hard drive space). This post will walk you through how we addressed some of these common problems to optimize your DrupalVM environments.

If you have not yet installed DrupalVM, head over to the [Quick Start Guide](https://github.com/geerlingguy/drupal-vm#quick-start-guide) or [read this excellent blog post](https://www.adcisolutions.com/knowledge/spinning-drupal-environment-drupal-vm) from ADCI Solutions going over a basic Drupal 8 installation.

**Network Management and Vagrant Plugins**

When multiple instances of DrupalVM, you will need to enter a new hostname, machine name, and IP address for each instance. Unfortunately, we can’t have more than one instance using the same hostname like \*.drupalvm.dev that points to a local address. The likelihood of you picking the same IP address as another device or service on your network is slim, but what if you never had to worry about that?

This is where we look towards some Vagrant Plugins to help us manage our network configuration. As you should know by now, DrupalVM is built on top of Virtualbox and Vagrant. Virtualbox (VB) is a virtualization software that in a nutshell, runs an operation system (OS) on top of your own OS. Vagrant is a tool that helps orchestrate the building of that OS through a configuration file called a [Vagrantfile](https://www.vagrantup.com/docs/vagrantfile/). As there are almost endless combinations of Vagrant options, we can use Vagrant plugins to help automate part of the configuration. There are three main plugins we use with DrupalVM:

1.  vagrant-auto\_network
2.  vagrant-hostsupdater (now included by default)
3.  vagrant-vbguest (now included by default)

As of [June 2017](https://github.com/geerlingguy/drupal-vm/issues/1378), the VBGuest and Hosts Updater are now automatically installed when you setup DrupalVM (unless manually overridden in the config.yml file). VBGuest helped to keep the Virtualbox Guest Additions software up-to-date (which VB uses to talk between the guest and host operating systems), and Hosts Updater automatically updated your local /etc/hosts file with domains configured in your config file by adding a unique hash next to each record, so if you power off or destroy your instance, it will clean up those host records as well.

My other favorite plugin is vagrant-auto\_network, which manages local IP addresses if you have multiple machines running on your computer. Instead of manually adding an IP address (which is sometimes necessary for external tunneling), you can just put in 0.0.0.0 and let Auto Network assign one for you!

**Drupal 7 vs Drupal 8**

One of our core products is a distribution called Open Enterprise, a base profile for content marketing that is built on Drupal 7. While the basic hosting requirements between D7 and D8 are minimal, there are a few gotchas that you can work through.

*   Disable composer build (drupal\_build\_composer\_project)If you’re using D7, you most likely aren’t using composer – so don’t bother with the build process.
*   Disable Drupal build (drupal\_install\_site)If you’re dealing with a shared codebase (like a Github repo or project on Pantheon / Acquia), then put all of your client projects in one direct and link that using synced folders.
*   Downgrade PHP (php\_version)While Drupal 7 core works fine out of the box with PHP 7.x, there can be some deprecation issues with contrib modules. If you run into anything, downgrade this to 5.6.
*   Downgrade Solr (solr\_version)If your project requires Search API Solr and runs on Drupal 7, you will need to downgrade your Solr version to 5.4.1 as the default 5.5.x which is not supported. There are more fixes to this specific issue, but this is the first step.

**Resource Management**

While DrupalVM is a great tool to mimic production environments and you can get a local Drupal site up and running in a matter of minutes, there can be a resource drawback when running multiple VM instances on your computer.

Every DrupalVM instance is essentially an entire Ubuntu server, which means even without a Drupal site (code, files, database) you’re already using around 4 GB of hard drive space every time you add a new DrupalVM. Then depending on the size of each site, and your VMs can start growing very quickly, and now your 256 GB solid state hard drive is almost to capacity with virtual machines.

One solution to this is to share a single VM instance when you have multiple, similar ongoing projects. This takes a few manual steps in your configuration YAML file.

1.  Use a grouped directory to store all of your similar projects, then sync that to your DrupalVM instance.

vagrant\_synced\_folders:

  – local\_path: /Users/developer/websites

    destination: /var/[www/websites](http://www/websites)

    type: nfs

    create: true

2.  Create a custom variable to use throughout the YAML configuration for this new path.

\# Custom path for websites directory.

websites\_path: “/var/[www/websites](http://www/websites)”

3.  Using the new variable, set up all your projects under the apache\_vhosts variable.

\# Apache VirtualHosts.

apache\_vhosts:

  – servername: “project.{{ drupal\_domain }}”

    documentroot: “{{ websites\_path }}/project”

    extra\_parameters: “{{ apache\_vhost\_php\_fpm\_parameters }}”

  – servername: “multisite.{{ drupal\_domain }}”

    serveralias: “multisite1.{{ drupal\_domain }} multisite2.{{ drupal\_domain }}”

    documentroot: “{{ websites\_path }}/multisite/docroot”

    extra\_parameters: “{{ apache\_vhost\_php\_fpm\_parameters }}”

4.  Add your databases to the list (you only need the database name), and for simplicity sake you can set the primary Drupal database user to have access to ALL databases (i.e., use \*.\* for privileges).

\# MySQL databases and users.

mysql\_databases:

  – name: “{{ drupal\_db\_name }}”

  – name: “{{ drupal\_db\_name }}\_project”

  – name: “{{ drupal\_db\_name }}\_multisite”

  – name: “{{ drupal\_db\_name }}\_multisite1”

  – name: “{{ drupal\_db\_name }}\_multisite2”

mysql\_users:

  – name: “{{ drupal\_db\_user }}”

    host: “%”

    password: “{{ drupal\_db\_password }}”

    priv: “\*.\*:ALL”

5.  (optional) Set your SSH Home variable to your custom project path variable.

ssh\_home: “{{ websites\_path }}”

**SED Scripting**

While all of this custom management is great to work through, it really does suck to do it over and over again. But my frustrations becomes your gain, as I’ve written a short bash script hosted on GitHub Gist that takes care of most of the basic legwork for copying and modifying the config.yml file ([you can find this script by visiting the link here](https://gist.github.com/kyletaylored/9ad838940180b8efb0b3aecfa6f54827)).

Be aware of the comment I posted on that page regarding the sed -i option if you’re working on a Mac, and the simplest solution is to install gnu-sed using Homebrew (brew install gnu-sed).

I hope this has helped simplify your DrupalVM setup process, and if you have your own tips and tricks for using DrupalVM, be sure to add them to the comments below!
