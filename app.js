var express = require('express'),
    session = require('express-session'),
    graphqlHTTP = require('express-graphql'),
    { buildSchema } = require('graphql');


var app = express();
var sess = {
  secret: 'keyboard cat',
  cookie: {}
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session(sess));

app.use(function (request, response, next) {

    if (request.session.views) {
       request.session.views++;
       console.log(request.session.views);
    } else {
        request.session.views = 1;
    }

    next();
});

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`type Query { hello: String }`),
    graphiql: true
}));

app.listen(3000);

console.log('http://localhost:3000/graphql');