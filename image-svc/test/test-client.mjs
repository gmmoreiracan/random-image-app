import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// Load the .proto file
const packageDefinition = protoLoader.loadSync('../imageService.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Create a new client
const client = new protoDescriptor.ImageService('localhost:50051', grpc.credentials.createInsecure());

// Call the GetRandomImage method
client.GetRandomImage({ word: 'test' }, (error, response) => {
    if (error) {
        console.error(error);
    } else {
        console.log(response);
    }
});