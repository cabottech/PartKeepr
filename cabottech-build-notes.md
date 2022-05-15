# Building PartKeepr code updates to production on Raspberry Pi server

The Cabot Technologies PartKeepr server is running on a Raspberry Pi 3.
This is PartKeepr 1.4 from GitHub. This is a fork of the official repo to add some tweaks and mods to streamline our internal workflow.

Whenever changes are made (i.e. changes in the src/ path), a proceedure needs to be followed to make these changes appear in production (i.e. in the normal web interface). This procedure is documented here:

**Note**: These steps do not include any unittesting / dev environment stuff!

Refer to: [PartKeepr WiKi - Developers/Re-generating the environment](https://wiki.partkeepr.org/wiki/Developers/Re-generating_the_environment)

Following any code changes, build to 'prod' environment as follows...

1. SSH into the Raspberry Pi: `ssh pi@192.168.10.24`
2. Go to the PartKeepr install path: `cd /var/www/partkeepr`
3. PartKeepr build command #1: `sudo php app/console nfq:sprite:generate`
4. PartKeepr build command #2: `sudo php app/console generate:extjs:entities`
5. PartKeepr build command #3: `sudo php app/console assetic:dump`
6. PartKeepr build command #4: `phing regenerate-environment`
7. Set write permission to all PartKeepr files: `sudo chmod 775 ./ -R`
8. Set owner to all PartKeepr files: `sudo chown www-data ./ -R`
9. Run PartKeepr setup from a web browser at http://192.168.10.24/setup - Note: just click next, don't change settings, and the existing installation will be preserved.
10. Get the authkey (required by web /setup): `cat app/authkey.php`
11. PartKeepr web interface should now be updated with all code updates!

## Update

See the build script: `partkeepr-build-prod.sh`. This essentially does the above with a few changes:

- Clears the `web/js/compiled` folder. It was found that sometimes stale JS in this folder would causes updates not to appear in production. Clearing this and forcing it to be re-built fresh each time is more reliable.
- Dosn't require web setup to be re-run. Uses some stuff from See: https://wiki.partkeepr.org/wiki/Running_PartKeepr_from_GIT#Console_commands.

## Requirements

- phing
- composer
