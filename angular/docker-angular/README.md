# DockerAngular

This is an example on how to use your angular app with docker.

## Building the app
## Building the dockerfile


To build the docker image use the following command in the terminal
;
```
docker build -t app-name .
```
If you are using a docker compose:
```
docker compose up
```
## Running the app

To run the app use the following command in the terminal:
```
docker run -it --publish 5000:5000 app-name
```