export class DomainError extends Error {
	constructor(message: string) {
		super(message)
		this.name = "DomainError"
	}
}

export class ValidationError extends DomainError {
	constructor(message: string) {
		super(message)
		this.name = "ValidationError"
	}
}

export class ServerError extends DomainError {
	constructor() {
		super("Something went wrong in the server")
		this.name = "ServerError"
	}
}

export class OperationError extends DomainError {
	constructor(message: string) {
		super(message)
		this.name = "OperationError"
	}
}

export class ForbiddenError extends DomainError {
	constructor(message: string) {
		super(message)
		this.name = "ForbiddenError"
	}
}

export class UnauthorisedError extends DomainError {
	constructor(message: string) {
		super(message)
		this.name = "UnauthorisedError"
	}
}

export class NotFoundError extends DomainError {
	constructor() {
		super("Server resource not found")
		this.name = "NotFoundError"
	}
}

export class UnexpectedError extends DomainError {
	constructor(err: unknown) {
		super("Unexpected error occurred")
		this.name = "UnexpectedError"
		console.error(err)
	}
}
