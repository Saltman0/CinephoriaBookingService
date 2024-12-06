docker_build('saltman0/nodejs-booking:dev', '.', entrypoint=".")

k8s_resource(
    workload='booking-nodejs-deployment',
    port_forwards=3001,
    labels=["backend"]
)