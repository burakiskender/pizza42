function f(user, context, callback) {
    var request = require("request");
    var google = require("googleapis");
    // Validate email
    if (!user.email || !user.email_verified) {
      return callback(null, user, context);
    }
    request.post(
      {
        url: "https://dev-wxbf7czc.au.auth0.com/oauth/token",
        headers: { "content-type": "application/json" },
        json: {
          client_id: "cCjltEZQUVHFldxJSxU8mnG02Bv8IHnx",
          client_secret:
            "wTgzrZEOuccUEZhbLOIBSMuoHFIWN45-CvhpNQ9dzV2HJwTHa5oLIgeEE9gMjJiO",
          audience: "https://dev-wxbf7czc.au.auth0.com/api/v2/",
          grant_type: "client_credentials"
        }
      },
      function(err, response, body) {
        if (response && response.statusCode >= 400) {
          return callback(
            new Error(
              "Error retrieving management API token: " + response.statusMessage
            )
          );
        }
        var managementApiToken = body.access_token;
  
        // Get User Profile
        var options = {
          method: "GET",
          url: `https://dev-wxbf7czc.au.auth0.com/api/v2/users/${user.user_id}`,
          headers: { authorization: `Bearer ${managementApiToken}` }
        };
  
        request(options, function(error, response, body) {
          if (error) throw new Error(error);
  
          var idpAccessToken = JSON.parse(body).identities[0].access_token;
          console.log(idpAccessToken);
  
          //Call Google API
          var options = {
            method: "GET",
            url: `https://people.googleapis.com/v1/people/me/connections?requestMask.includeField=person.names`,
            headers: { authorization: `Bearer ${idpAccessToken}` }
          };
          request(options, function(error, response, body) {
            if (error) throw new Error(error);
  
            var googleConnections = JSON.parse(body).totalPeople;
  
            //Set User Profile
            user.user_metadata = user.user_metadata || {};
            user.user_metadata.googleConnections = user.user_metadata.googleConnections || googleConnections;
            auth0.users
              .updateUserMetadata(user.user_id, user.user_metadata)
              .then(() => {
                //context.idToken.googleConnections = user.user_metadata.googleConnections;
                callback(null, user, context);
              })
              .catch(err => {
                callback(err);
              });
          });
        });
      }
    );
    context.idToken['https://dev-wxbf7czc.au.auth0.com/googleConnections'] = user.user_metadata.googleConnections;
  }
  