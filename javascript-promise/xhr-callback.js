function getURLCallback(URL, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', URL, true);
  request.send();
  request.onload = function() {
    if (request.status == 200) {
      callback(null, request.responseText);
    } else {
      callback(new Error(request.responseText), request.response);
    }
  };

  request.onError = function() {
    callback(new Error(request.responseText));
  };
}

function jsonParse(callback, error, value) {
  if (error) {
    callback(error, value);
  } else {
    try {
      callback(null, JSON.parse(value));
    } catch(error) {
      callback(error, value);
    }
  }
}

function allRequests(requests, callback, results) {
  if (requests.length === 0) return callback(null, results);

  const request = requests.shift();
  request(function(error, value) {
    if (error) {
      callback(error, value);
    } else {
      results.push(value);
      allRequests(requests, callback, results);
    }
  });
}

function main(callback) {
  const request = {
    comment(callback) => getURLCallback(
      'http://azu.github.io/promises-book/json/comment.json',
      jsonParse.bind(null, callback)
    ),
    people(callback) => getURLCallback(
      'http://azu.github.io/promises-book/json/people.json',
      jsonParse.bind(null, callback)
    )
  };

  allRequests([request.comment, request.people], callback, []);
}

main((error, results) => {
  if (error) return console.error(error);
  console.log(results);
});
