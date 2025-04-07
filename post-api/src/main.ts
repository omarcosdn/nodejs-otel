import express from 'express';
import {getPosts, incrementLike} from './http-client';
import pino from 'pino';
import {pinoHttp} from 'pino-http';
import {context, metrics, trace} from '@opentelemetry/api';

const logger: pino.Logger = pino({
  level: 'info',
  hooks: {
    logMethod(inputArgs, method) {
      const activeSpan = trace.getSpan(context.active());
      if (activeSpan) {
        activeSpan.addEvent('log', {
          level: inputArgs[0],
          message: inputArgs.slice(1).join(' '),
        });
      }
      return method.apply(this, inputArgs);
    },
  },
});
const pinoMiddleware = pinoHttp({
  logger,
});

const routes = express.Router();

const meter = metrics.getMeter('post-api');

const observableGaugePing = meter.createObservableGauge(
  'post.ping',
  {
    description: 'Ping',
    unit: 'By',
  },
);

const observableGaugePong = meter.createObservableGauge(
  'post.pong',
  {
    description: 'Pong',
    unit: 'By',
  },
);

routes.get('/post-api/post', async (req: express.Request, res: express.Response) => {
  const currentSpan = trace.getSpan(context.active());

  const traceId = currentSpan ? currentSpan.spanContext().traceId : 'unknown';

  logger.info('post ping');

  observableGaugePing.addCallback((result) => {
    result.observe(Date.now(), {
      trace_id: traceId,
    });
  });

  const posts = await getPosts();

  observableGaugePong.addCallback((result) => {
    result.observe(Date.now(), {
      trace_id: traceId,
    });
  });

  logger.info('post pong');

  res.json({
    status: 200,
    content: [...posts],
  });
});

routes.post('/post-api/post/like/:id', async (req: express.Request, res: express.Response) => {
  const postId = req.params.id;
  if (!postId) {
    res.status(400).json({
      status: 400,
      message: 'invalid postId',
    });
    return;
  }

  logger.info({
    data: {
      postId: postId,
    },
  }, `incrementing like for postId: ${ postId }`);

  await incrementLike(Number(postId));
  res.json({
    status: 200,
    message: 'you liked',
  });
});

const app = express();
app.use(pinoMiddleware);
app.use(express.json());
app.use(routes);

app.listen(3002, () => {
  logger.info('server is running on port #3002');
});
