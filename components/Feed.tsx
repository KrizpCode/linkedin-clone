import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import Input from './Input';
import { handlePostState, useSSRPostsState } from '../atoms/postAtom';
import Post from './Post';

interface PostType {
    _id: string;
    input: string;
    photoUrl: string;
    username: string | null | undefined;
    email: string | null | undefined;
    userImg: string | null | undefined;
    createdAt: string;
}

interface FeedProps {
    posts: PostType[];
}

const Feed = ({ posts }: FeedProps) => {
    const [realtimePosts, setRealtimePosts] = useState<PostType[] | []>([]);
    const [handlePost, setHandlePost] = useRecoilState(handlePostState);
    const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseData = await response.json();
            setRealtimePosts(responseData);

            setHandlePost(false);
            setUseSSRPosts(false);
        };

        fetchPosts();
    }, [handlePost]);

    return (
        <div className="space-y-6 pb-24 max-w-lg">
            <Input />

            {!useSSRPosts
                ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
                : posts.map((post) => <Post key={post._id} post={post} />)}
        </div>
    );
};

export default Feed;
