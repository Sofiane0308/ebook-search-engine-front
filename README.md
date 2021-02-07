# Booklib front application for a gutenberg project clone


## Before you run
Provide elasticsearch and backend API ip addresses as environment variables (eg. 192.168.1.4 for both)
### With Docker
    ' docker run -e API_HOST=192.168.1.4 -e ES_HOST=192.168.1.4 sofianechikhbled/booklib-front '
### On your machine
    -   Create .env file on the root directory
    -   Add the environment variables as follow:
        REACT_APP_API_HOST=192.168.1.4
        REACT_APP_ES_HOST=192.168.1.4
    -   install dependencies: 'yarn'
    -   run development server: 'yarn start'

