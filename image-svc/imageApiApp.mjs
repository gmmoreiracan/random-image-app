import express from 'express';
import axios from 'axios';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import imgSvcGRPC from './imageService_grpc_pb.js';
import imgSvc from './imageService_pb.js';

const {ImageResponse,ImageServiceService} = imgSvcGRPC;
const {ImageServiceClient} = imgSvc;

const app = express();

const server = new Server();
server.addService(ImageServiceService, { // Fix: Import 'ImageApi' from './imageService_grpc_pb.mjs'
    getRandomImage: (call, callback) => {
        const query = call.word;
        axios.get(`https://list.ly/api/v4/search/image?q=${query}`)
            .then(response => {
                const imageData = response.data;
                const imageResponse = new ImageResponse();
                imageResponse.setData(imageData);
                callback(null, imageResponse);
            })
            .catch(error => {
                console.error(`Error: ${error}`);
                callback(error, null);
            });
    }
});

server.bindAsync('0.0.0.0:50051', ServerCredentials.createInsecure(), () => {
    server.start();
  });

console.log('gRPC server is running on port 50051');