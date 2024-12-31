import { HttpService } from '@nestjs/axios';
export declare class PythonService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private readonly pythonServiceUrl;
    extractKeywords(content: string): Promise<any>;
}
