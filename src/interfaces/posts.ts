export interface IPost {
    name: string,
    comment: string,
    reactions: {
        likes: number,
        shares: number
    }
};