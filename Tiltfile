docker_build('saltman0/nodejs-booking:1.0.0', '.')

k8s_resource(
    workload='booking-nodejs-deployment',
    labels=["backend"]
)