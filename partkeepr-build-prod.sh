#!/bin/bash

# 20220514 DJC - PartKeepr production build script.
# Run this after making changes to source code.
# Build time on Raspberry Pi 3 takes approx. 4~5 minutes.

echo "PartKeepr production build script"

# Start in PartKeepr base path:
cd /var/www/partkeepr || exit

echo "Clearing all cached configurations..."
rm -rf app/cache/*

# Remove existing compiled JS. Leaving this here has previously caused issues.
# We will be rebuilding this all from scratch to ensure all changes are applied.
echo "Clearing existing compiled JaveScript..."
rm web/js/compiled -R

# Run the PartKeepr update process without having to re-setup manually.
# See: https://wiki.partkeepr.org/wiki/Running_PartKeepr_from_GIT#Console_commands

echo "Clearing the production cache..."
php app/console cache:clear --env=prod

echo "Executing the database migrations..."
php app/console doctrine:migrations:migrate --no-interaction

echo "Updating the database schema..."
php app/console doctrine:schema:update --force

echo "Building all required files and warming up the cache..."
phing regenerate-environment

echo "Running all PartKeepr crons..."
php app/console partkeepr:cron:run

echo "Resetting file permissions..."
sudo chmod 775 ./ -R
sudo chown www-data ./ -R

echo "Done! :)"
