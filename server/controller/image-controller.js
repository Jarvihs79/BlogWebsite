import mongoose from 'mongoose';

const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'photos',
  });
});

export const uploadImage = (request, response) => {
  if (!request.file) {
    return response.status(404).json({ error: 'File not found' });
  }

  const imageUrl = `http://localhost:27010/api/blogs/image/${request.file.filename}`;

  response.status(200).json({ url: imageUrl });
};

export const getImage = async (request, response) => {
  try {
    const file = await gfs.find({ filename: request.params.filename }).toArray();

    if (!file || file.length === 0) {
      return response.status(404).json({ error: 'File not found' });
    }

    const readStream = gfs.openDownloadStreamByName(request.params.filename);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
