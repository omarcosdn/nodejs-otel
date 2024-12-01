import express from 'express';
import {getPosts, incrementLike} from './database';

const routes = express.Router();

routes.get('/post-service/post', async (req: express.Request, res: express.Response) => {
  const posts = await getPosts();
  res.json({
    status: 200,
    content: [...posts],
  });
});

routes.post('/post-service/post/like/:id', async (req: express.Request, res: express.Response) => {
  const postId = req.params.id;
  if (!postId) {
    res.status(400).json({
      status: 400,
      message: 'invalid postId',
    });
    return;
  }

  await incrementLike(Number(postId));
  res.json({
    status: 200,
    message: 'you liked',
  });
});

const app = express();
app.use(express.json());
app.use(routes);

app.listen(3001, () => {
  console.log('server is running on port #3001');
});