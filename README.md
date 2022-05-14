# Notes on this fork

This is a fork that has been modified for internal use by [Cabot Technologies](https://cabottechnologies.com). There are a few things removed and changed. This is very specific to our manufacturing workflow, so please bare this in mind.

This fork is made public here to share our changes, and just in case anyone else can benefit from these.

Some of our changes include:

- Parts has a new field added: `costingPrice`. This is slightly different to `averagePrice` in that if the last order price was higher than average, it uses this. We found this is better for our project costing estimation.
- The internal part number (IPN) is much more prominant. We use this a lot inhouse, so it's the first column and used to sort in the grid view.
- Project Reports uses our new `Part.costingPrice` instead of the 'lowest distributor' prices. The 'Auto-Fill Distributors' button is now 'Calculate Costings'. Again, this suits our project costing estimates workflow.
- Replaced the Patreon button with a button to Radishi production tracking system.
- A production build script for convenience: `partkeepr-build-prod.sh`, and some documentation: `cabottech-build-notes.md`. Requires: `phing` and `composer`.

**Our mods are on branch: `ct-mods`**

---

[![PartKeepr](https://partkeepr.org/images/partkeepr-banner.png)](https://www.partkeepr.org)

[![JSON-LD enabled](http://json-ld.org/images/json-ld-button-88.png)](http://json-ld.org)
[![Build Status](https://travis-ci.org/partkeepr/PartKeepr.svg?branch=sf2migration)](https://travis-ci.org/partkeepr/PartKeepr)
[![SensioLabsInsight](https://insight.sensiolabs.com/projects/a9f5bdce-ac86-4c51-b87d-56fd0f241155/mini.png)](https://insight.sensiolabs.com/projects/a9f5bdce-ac86-4c51-b87d-56fd0f241155)
[![Code Climate](https://codeclimate.com/github/partkeepr/PartKeepr/badges/gpa.svg)](https://codeclimate.com/github/partkeepr/PartKeepr)
[![Test Coverage](https://codeclimate.com/github/partkeepr/PartKeepr/badges/coverage.svg)](https://codeclimate.com/github/partkeepr/PartKeepr/coverage)
[![codecov](https://codecov.io/gh/partkeepr/PartKeepr/branch/master/graph/badge.svg)](https://codecov.io/gh/partkeepr/PartKeepr)


PartKeepr is an [inventory management software](https://en.wikipedia.org/wiki/Inventory_management_software), primarily
designed for electronic components.

PartKeepr is written in **PHP** and using the [**Symfony2**](http://symfony.com) framework.

Demo Sites
----------

To test everything which has been written so far, there are two demo pages prepared.

The latest release from github is available at http://demo.partkeepr.org.
The most up-to-date version of the GitHub `master` branch is published at https://demo-git.partkeepr.org.
Both demo pages are built from the git sources and reset to a demo state once an hour.

Requirements
------------

PartKeepr needs:

* PHP between 7.0 and 7.1 - migration to newer symfony is needed before we support current php 7.x
* A MySQL or PostgreSQL database

Installation
------------

Please read our [setup guide](documentation/Installation.md)

Thanks
------

A very big "thank you" goes out to Georgyo of NYC resistor - although he claimed that he isn't creative, he invented the
name "PartKeepr" which eventually became the project's name.
