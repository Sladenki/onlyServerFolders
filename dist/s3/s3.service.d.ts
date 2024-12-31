export declare class S3Service {
    private s3;
    constructor();
    uploadFile(file: any): Promise<any>;
    deleteFile(filePath: string): Promise<any>;
}
