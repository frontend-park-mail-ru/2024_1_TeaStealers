class GlobalVariables {
    constructor() {
        this.HTTP_STATUS_OK = 200;
        this.HTTP_BAD_REQUEST = 400;
        this.HTTP_FORBIDDEN = 403;
        this.HTTP_STATUS_NOT_FOUND = 404;
        this.HTTP_INTERNAL_SERVER_ERROR = 500;
    }
}

export const globalVariables = new GlobalVariables();