# Farm App
Deployment Guide

### Description
Looks up farms by name, find farms by revenue and view details for a given farm.

## Prerequisites
1. Node

## Local Deployment
```bash
cd farm-app-fullstack
npm install
npm start
```
Navigate to http://localhost:8000/ to view app.

## Testing
```bash
npm test
```
## Design Choices
1. Sidebar is used to display filters and farm list.
1. Clicking a farm in the sidebar displays the farm and field data in cards in the main content area.

## Future Direction
1. 1 more day: add a filter reset button, sort farms and fields, adjust display of field data, show revenue in currency format
1. 1 more week: get location data and display farms on a map
