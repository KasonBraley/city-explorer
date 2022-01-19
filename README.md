# City Explorer

[![Netlify Status](https://api.netlify.com/api/v1/badges/cff451ea-47e5-4182-a711-d420f3b9f1c1/deploy-status)](https://app.netlify.com/sites/city-explorer-game/deploys)

## Overview

Provides quick answers to location based queries. Response
data includes location data (with a map), the weather forecast for
that location, and movies with that cities name.

## Installation

Steps to follow to setup the application on your local machine.

Requires the following dependencies:

- Node.js >= 16
- Yarn
- Go >= 1.17.0
- API Keys from:
  - [Location IQ Geocoding API](https://locationiq.com/)
  - [themoviedb](https://developers.themoviedb.org/3)
  - [weatherbit.io](https://www.weatherbit.io/api)

### Local Setup

#### Docker Compose

The following commands will start both the frontend and backend services.

1. Using the [.env.sample](.env.sample) as a reference, set the required variables for the environment. Create a `.env` file with those values.
2. `docker compose build`
3. `docker compose up`

Default ports:

- Frontend: 3000
- Backend: 5000

<details>
<summary>Docker only</summary>

##### Backend

1. Using the [.env.sample](.env.sample) as a reference, set the required variables for the environment. Create a `.env` file with those values.
2. `docker build -t city-explorer .`
3. `docker run --rm -p 5000:5000 --env-file=.env city-explorer:latest`

##### Frontend

1. `cd web`
2. `docker build -t city-explorer-web .`
3. `docker run --rm city-explorer-web:latest`

</details>

---

**Third Party API's used**:

- [Location IQ Geocoding API](https://locationiq.com/)
- [themoviedb](https://developers.themoviedb.org/3)
- [weatherbit.io](https://www.weatherbit.io/api)
