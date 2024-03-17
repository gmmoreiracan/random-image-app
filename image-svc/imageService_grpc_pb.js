// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var imageService_pb = require('./imageService_pb.js');

function serialize_ImageRequest(arg) {
  if (!(arg instanceof imageService_pb.ImageRequest)) {
    throw new Error('Expected argument of type ImageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageRequest(buffer_arg) {
  return imageService_pb.ImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ImageResponse(arg) {
  if (!(arg instanceof imageService_pb.ImageResponse)) {
    throw new Error('Expected argument of type ImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageResponse(buffer_arg) {
  return imageService_pb.ImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ImageServiceService = exports.ImageServiceService = {
  getRandomImage: {
    path: '/ImageService/GetRandomImage',
    requestStream: false,
    responseStream: false,
    requestType: imageService_pb.ImageRequest,
    responseType: imageService_pb.ImageResponse,
    requestSerialize: serialize_ImageRequest,
    requestDeserialize: deserialize_ImageRequest,
    responseSerialize: serialize_ImageResponse,
    responseDeserialize: deserialize_ImageResponse,
  },
};

exports.ImageServiceClient = grpc.makeGenericClientConstructor(ImageServiceService);
