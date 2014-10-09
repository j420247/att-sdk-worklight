/**
 * This method will invoke the OAuth token adapter
 * 
 * @param successCallback
 * @param failCallback
 */
function getAuthorizationCode(successCallback, failCallback, bypassOnnetworkAuth, suppressLandingPage)
{   
   var params = {};
   
   if(bypassOnnetworkAuth != undefined && bypassOnnetworkAuth==true)
   {
	   params.bypassOnnetworkAuth = true;
   }

   if(suppressLandingPage != undefined && suppressLandingPage==true)
   {
	   params.suppressLandingPage = true;
   }
   
   var invocationData = {
      adapter : 'OAuthAdapter',
      procedure : 'getAuthCode',
      parameters : [params]
   };
   
   var options = {
      onSuccess : successCallback,
      onFailure : failCallback,
      invocationContext : {}
   };

   WL.Client.invokeProcedure(invocationData, options);
};

function authorizeAccessToken(authorizationCode, successCallback, failCallback)
{
   getAccessToken(authorizationCode, null, successCallback, failCallback);
}

function refreshAccessToken(refreshToken, successCallback, failCallback)
{
   getAccessToken(null, refreshToken, successCallback, failCallback);
}

function getAccessToken(authorizationCode, refreshToken, successCallback, failCallback)
{
   var options = {
      onFailure : failCallback,
      onSuccess: successCallback,
      invocationContext : {}
   };

   var params = {};
   
   if(authorizationCode !== undefined && authorizationCode != null) {
      params.code = authorizationCode;
   } else if (refreshToken !== undefined && refreshToken != null) {
      params.refreshToken = refreshToken;
   } else {
	   failCallback({'result': "No authorization code or refresh token provided"});
   }
   
   invocationData = {
      adapter : 'OAuthAdapter',
      procedure : 'getAccessToken',
      parameters : [ params ]
   };

   WL.Client.invokeProcedure(invocationData, options);
};