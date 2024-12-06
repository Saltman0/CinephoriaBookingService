docker_build('saltman0/nodejs-api:1.0.0')

k8s_resource(workload='booking-nodejs-deployment', port_forwards=3001, labels=["backend"])