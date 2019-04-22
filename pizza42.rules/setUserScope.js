function  setUserScope(user, context, callback) {
  // Get requested scopes
  var scopes = (context.request.query && context.request.query.scope);
  var requestedScopes = (scopes && scopes.split(" ")) || [];
  var result = restrictScopes(user, requestedScopes);
  context.accessToken.scope = result;
  callback(null, user, context);    

  function restrictScopes(user, requested) {
    var allScopes = ["openid","profile","email","gender", "read:menu", "create:orders"];
    var allowedScopes;
    
    if (!user.email_verified) {
      allowedScopes = ["openid","profile","email","gender","read:menu"];
    } else {
      allowedScopes = allScopes;
    }
    return requested.filter(value => -1 !== allowedScopes.indexOf(value));
  }
}