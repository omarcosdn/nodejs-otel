import axios, { AxiosInstance } from "axios";

const getHttpClient = (): AxiosInstance => {
    return axios.create({
        baseURL: 'http://localhost:3001',
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

export type Post = {
    id: number;
    title: string;
    body: string;
    likes_count: number;
};

export type PostResponse = {
    content: Post[];
};

const getPosts = async (): Promise<Post[]> => {
    const { data } = await getHttpClient().get<PostResponse>("/post-service/post");
    return data.content ?? [];
};

const incrementLike = async (postId: number): Promise<void> => {
    await getHttpClient().post<Post[]>(`/post-service/post/like/${ postId }`);
};

export { getPosts, incrementLike };