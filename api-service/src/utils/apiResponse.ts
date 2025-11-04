export class ApiResponse<T> {
    public status: number;
    public message: string;
    public data: any;

    constructor(status: number, message: string, data: any) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
    
    static success<T>(data?: T, message = "Success", status = 200): ApiResponse<T> {    
        return new ApiResponse<T>(status, message, data);
    }

    static error(message: string, status = 400): ApiResponse<null> {
        return new ApiResponse(status, message, null);
    }
}