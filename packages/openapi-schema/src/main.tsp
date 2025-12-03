import "@typespec/http";

using Http;

@service(#{ title: "Obsidian Google Drive Sync" })
namespace ObsidianGoogleDriveSync;

@doc("A refresh token is a credential used to obtain a new access token when the current one expires, without requiring the user to re-authenticate.")
scalar refreshToken extends string;

@doc("An access token is a credential issued by the authorization server to the client application, representing the authorization granted by the resource owner to access protected resources (like APIs) on a resource server.")
scalar accessToken extends string;

scalar expiresIn extends int32;

scalar errorMessage extends string;

model ExchangeAccessTokenRequest {
  refreshToken: refreshToken;
}

model ExchangeAccessTokenResponse {
  accessToken: accessToken;
  expiresIn: expiresIn;
}

model HealthcheckResponse {
  message: string;
}

@error
model ValidationError {
  code: "VALIDATION_ERROR";
  message: errorMessage;
}

@error
model InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: errorMessage;
}

@route("/health")
@get
op healthcheck(): {
  @statusCode statusCode: 200;
  @body response: HealthcheckResponse;
} | {
  @statusCode statusCode: 400;
  @body error: ValidationError;
} | {
  @statusCode statusCode: 500;
  @body error: InternalServerError;
};

@route("/access-token")
namespace GoogleDriveAPI {
  @post
  op exchangeAccessToken(@body request: ExchangeAccessTokenRequest): {
    @statusCode statusCode: 200;
    @body response: ExchangeAccessTokenResponse;
  } | {
    @statusCode statusCode: 400;
    @body error: ValidationError;
  } | {
    @statusCode statusCode: 500;
    @body error: InternalServerError;
  };
}
