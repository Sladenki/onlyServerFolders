export declare class CreatePostDto {
    content: string;
    imgPath?: any;
    reaction?: {
        emoji: string;
        text: string;
    };
    childrenTopic?: string;
    selectedTopic?: {
        _id: string;
        name: string;
    };
}
