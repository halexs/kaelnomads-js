# kaelnomads-js

Frontend for [kaelnomads.com](https://kaelnomads.com), Alex and Keily's travel and personal website.
Built with React 17 (Create React App), Material UI 5 and React-Leaflet.

Infrastructure (S3, CloudFront, Route53, CodePipeline, API) lives in the sibling repo
[`website_iac`](https://github.com/halexs/website_iac).

## Features

| Route     | Component                       | Description                                                        |
|-----------|---------------------------------|--------------------------------------------------------------------|
| `/`       | `HomePage`                      | Landing page with buttons to the other sections                    |
| `/travel` | `TravelMap`                     | Leaflet map of places visited, colour-graded route, legend, modal  |
| `/alex`   | `Alex`                          | Alex's profile                                                     |
| `/keily`  | `Keily`                         | Keily's profile (placeholder)                                      |

## Getting started

Prerequisites: Node.js (a current LTS release) and npm.

```sh
npm install
npm start        # dev server on http://localhost:3000
npm test         # jest, interactive watch mode
npm run build    # production bundle in build/
```

## Project layout

```
src/
  App.js                 Router, top AppBar/tabs, mobile detection (width <= 768px)
  components/
    HomePage.js          Renders the page for the current route
    TravelMap.js         Fetches locations, draws markers + polylines
    TravelMapLegend.js   Leaflet control listing locations, zoom + modal trigger
    LocationsModal.js    Detail modal for a selected location (pictures TBD)
    Alex.js / Keily.js   Profile pages
aws_codebuild/           Buildspecs used by the CodePipeline (dev.yaml, prod.yaml)
locations.json           Source of truth for travel locations (uploaded to S3)
error.html               Redirects unknown paths back to / (client-side routing on S3)
```

## Data flow: travel locations

1. `locations.json` in this repo is edited by hand (see schema below).
2. `npm run update_locations` backs up and uploads it to `s3://kaelnomads-resources/locations.json`.
3. A Lambda behind API Gateway (`GET /beta/location`) reads that object and returns it.
4. `TravelMap` fetches it once per browser session and caches it in `sessionStorage`
   (key `locations`). Clear session storage to see fresh data.

`locations.json` schema (keys are sequential string indices, ordered by trip):

```json
{
  "0": {
    "city": "Fairfax County",
    "state": "VA",
    "time": "12",
    "timeUnit": "M",
    "coordinates": [38.85, -77.342],
    "description": ""
  }
}
```

`timeUnit` is `"D"` (days) or `"M"` (months). `time` is a string.

## Deployment

Pushes to `main` trigger the `kaelnomads-frontend` CodePipeline:

1. **Source** - GitHub (CodeStar connection)
2. **DeployDevWebsite** - `aws_codebuild/dev.yaml`: build, sync to the dev bucket, invalidate dev CloudFront
   (https://dev.kaelnomads.com)
3. **ManualProdApproval** - a human approves in the AWS console
4. **DeployProdWebsite** - `aws_codebuild/prod.yaml`: build and sync to the prod bucket

Bucket names and the CloudFront id are injected as CodeBuild environment variables
(`S3_BUCKET_NAME`, `CLOUDFRONT_DEV_ID`) by Terraform. `npm run deploy` is a legacy manual deploy
to `s3://kaelnomads.com` and should not normally be used.

## Known issues / tech debt

See [`docs/ISSUE_PLANS.md`](docs/ISSUE_PLANS.md) for per-issue implementation plans, and the
"Cross-cutting findings" section there for tech debt (hardcoded API URL/key in `TravelMap.js`,
unused `old_buildspec.yaml`, no tests beyond the CRA stub, etc.).

## History

Migrated from TypeScript back to plain JavaScript/JSX because TypeScript caused too many
library typing issues.
