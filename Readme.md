

# Getting started

Build the image

    docker build -t dynamic-form .

Run the container

    docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 3000:3000 --rm --name dynamic-form dynamic-form

App is served at http://localhost:3000

# Running the unit tests

    docker exec -it dynamic-form npm run-script unittest

# Running the UI tests

    docker exec -it dynamic-form npm run-script test "chrome:headless --no-sandbox" tests/testcases -- -s screenshots -S



# Links

 - https://hackernoon.com/e2e-testing-react-applications-with-testcafe-8edb605ec66c
 - https://hackernoon.com/running-karma-tests-with-headless-chrome-inside-docker-ae4aceb06ed3
 - https://frontarm.com/james-k-nelson/how-to-integrate-react-into-existing-app/


# TODO

- Write tests for textarea, checkbox, radio, fieldset
- name element & validation
- tests for repeat