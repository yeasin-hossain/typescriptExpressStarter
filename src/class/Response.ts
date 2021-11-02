import { getReasonPhrase } from "http-status-codes";
export default class ResponseMessage {
  successResponse(data: any) {
    return {
      message: "success",
      code: 200,
      status: getReasonPhrase(200),
      error: false,
      response: data,
    };
  }
  notFoundResponse(message: string) {
    return {
      message,
      code: 404,
      status: getReasonPhrase(404),
      error: true,
      response: null,
    };
  }
  badRequestResponse(message: string) {
    return {
      message,
      code: 400,
      status: getReasonPhrase(400),
      error: true,
      response: null,
    };
  }
  serverErrorResponse() {
    return {
      message: "Internal Server Error",
      code: 500,
      status: getReasonPhrase(500),
      error: true,
      response: null,
    };
  }
}
