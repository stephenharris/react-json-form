

# Getting started

Build the image

    docker build -t json-form .

Run the container

    docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3000:3000 --rm --name json-form json-form

App is served at http://localhost:3000

# Running the unit tests

    docker exec -it json-form npm run-script unittest

# Running the UI tests

    docker exec -it json-form npm run-script test "chrome:headless --no-sandbox" tests/testcases -- -s screenshots -S

