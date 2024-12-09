docker_build('saltman0/nodejs-booking:dev', '.', entrypoint=".")

k8s_resource(
    workload='booking-nodejs-deployment',
    labels=["backend"]
)