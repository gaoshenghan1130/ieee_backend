# Read me for authorization with University of Michigan OAuth2

Client key: 72aE7VADNpqG9TZP9PJGiH5GnzzNwAuFKOfA4ZiZOL0rYuyb
Client Secret: IoY2IzjyK8f375rtbfEkykpUIxkyR21Jz7TZcYDJ5V64SKCUTA5ZXGd5OmaxV9nj

will use this to access Person API.


Student
      │
      │ 1. Click "Login with UM" Button
      ▼
Website
      │
      │ 2. Redirect → UM InCommon / Shibboleth Login Page
      ▼
UM Login Page
      │
      │ 3. Student Enters Credentials → Submit
      ▼
Authorization Server (UM OAuth2)
      │
      │ 4. Redirect → Your Redirect URI with Authorization Code
      │    e.g. https://yourdomain.com/oauth2/callback?code=<auth_code>
      ▼
Web Server (Backend)
      │
      │ 5. Use Authorization Code to request Access Token
      │    POST https://gw.api.it.umich.edu/um/oauth2/token
      │    grant_type=authorization_code
      │    client_id, client_secret
      │    code=<auth_code>
      ▼
OAuth2 Access Token
      │
      │ 6. use Access Token to call Person API
      │    GET https://gw.api.it.umich.edu/um/person/v1/person/<student_id>
      │    Header: Authorization: Bearer <access_token>
      ▼
Person API Response
      │
      │ 7. response JSON:
      │    {
      │       "uniqname": "jsmith",
      │       "firstName": "John",
      │       "lastName": "Smith",
      │       ...
      │    }
      ▼
Web Server
      │
      │ 8. use uniqname to enter sql database and get user info, also use it to determine authority level
      ▼
Student Dashboard
