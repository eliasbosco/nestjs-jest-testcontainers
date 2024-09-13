#!/bin/sh

# Wait until the database is ready
echo "Waiting for the database..."
while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "Database is up"

echo "Running migrations..."
yarn migration:run

echo "Starting application..."
node ./dist/main.js