import { atom } from 'recoil';

export const handlePostState = atom({
    key: 'handlePostState',
    default: false,
});

interface PostType {
    _id: string;
    input: string;
    photoUrl: string | undefined;
    username: string | null | undefined;
    email: string | null | undefined;
    userImg: string | null | undefined;
    createdAt: string;
}

export const getPostState = atom<PostType>({
    key: 'getPostState',
    default: {
        _id: '',
        input: '',
        photoUrl: '',
        username: '',
        email: '',
        userImg: '',
        createdAt: '',
    },
});

export const useSSRPostsState = atom({
    key: 'useSSRPostsState',
    default: true,
});
