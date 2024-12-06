docker_build('saltman0/nodejs-api:dev')

k8s_resource(workload='booking-nodejs-deployment', port_forwards=3001, labels=["backend"])