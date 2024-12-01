import pgp from 'pg-promise';

export type Post = {
  id: number;
  title: string;
  body: string;
  likes_count: number;
};

const db = pgp()('postgres://dev:dev@127.0.0.1:5432/otel_app');

const query = async <T>(statement: string, params: any[]): Promise<T[]> => {
  return db?.query(statement, params);
};

const getPosts = async (): Promise<Post[]> => {
  const data = await query<Post>('SELECT * FROM public.post', []);
  return data ?? [];
};

const incrementLike = async (postId: number): Promise<void> => {
  const statement = 'UPDATE public.post SET likes_count = likes_count + 1 WHERE id = $1';
  await db.none(statement, [postId]);
};

export {getPosts, incrementLike};
