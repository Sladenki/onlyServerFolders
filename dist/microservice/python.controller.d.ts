import { HttpService } from '@nestjs/axios';
import { PythonService } from './python.service';
export declare class PythonController {
    private readonly httpService;
    private readonly pythonService;
    constructor(httpService: HttpService, pythonService: PythonService);
    extractKeywords(data: {
        content: string;
    }): Promise<any>;
}
