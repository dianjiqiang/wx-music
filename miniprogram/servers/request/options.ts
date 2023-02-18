export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  OPTIONS = "OPTIONS",
  PUT = "PUT",
  DELETE = "DELETE"
}

export interface RequestOptions {
	url: string
	method?: HttpMethod
	data?: any
	needToken?: boolean | any
	header?: object | any
	dataType?: string | any
	noShowMsg?: boolean | any
}