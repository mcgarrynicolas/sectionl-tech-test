# Section L City Gems Webapp

A very basic, barebones webapp to serve as a proof of concept for a Section L browsing experience, essentially. It has the features that I outlined in the interview, but in an effort to cut myself off at a total of 6 hours of work, it is in an undeployed undeployable state. 

## Dev Setup
To access API requests I was using a local proxy, and because it's an SPA, I would've had to perform additional configuration to bypass CORS, so it's not exactly able to be run out of the box.
Specifically, I was using local-cors-proxy configured on port 8010 by default to run this from my local machine. I would have set it up to be more properly compatible with a deployment flow, but I lost track of time.
Outside of that, I wasn't using any particularly out-there setups or libraries -- Vite via the create-react-app react-router framework, with a few supplementary libraries to make development slightly faster, and Tailwind.

## Tech Stack

- **Framework**: As mentioned earlier, it's a Vite app in SPA mode configured from react-router
- **Language**: TS
- **UI**: React, Tailwind
- **State Management**: Homerolled with Outlets and Reducers
- **Data Fetching**: The world's most basic Axios setup
- **Code Quality**: hits of Prettier at the end, ESLint cleanup
- **Testing, Deployment, Etc**: Unable to be completed in time

## Features
- Filtering by tag and category
- Generation of a QR Code to take the page back with you
