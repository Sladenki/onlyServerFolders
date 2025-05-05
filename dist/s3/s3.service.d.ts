export declare class S3Service {
    private s3;
    constructor();
    uploadFile(file: any, customPath?: string): Promise<any>;
    deleteFile(filePath: string): Promise<any>;
}
