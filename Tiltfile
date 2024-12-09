docker_build('saltman0/nodejs-booking:dev', '.')

k8s_resource(
    workload='booking-nodejs-deployment',
    labels=["backend"]
)