import "@typespec/http";

using Http;

@service(#{ title: "Obsidian Google Drive Sync" })
namespace ObsidianGoogleDriveSync;


scalar refreshToken extends string;

scalar accessToken extends string;

scalar expiresIn extends int32;

model ExchangeAccessTokenRequest {
  refreshToken: refreshToken;
}

model ExchangeAccessTokenResponse {
  accessToken: accessToken;
  expiresIn: expiresIn;
}

@error
model ValidationError {
  code: "VALIDATION_ERROR";
  message: string;
}

@error
model InternalServerError {
  code: "INTERNAL_SERVER_ERROR";
  message: string;
}

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
