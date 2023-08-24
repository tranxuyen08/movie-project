import passport from "passport";
import GitHubStrategy from "passport-github2";
// import { Strategy } from 'passport-google-oauth20';

// const GOOGLE_CLIENT_ID =
//   "470743111109-e0dk1tgdn43bipkktfrce52jeaeja8mu.apps.googleusercontent.com";
// const GOOGLE_CONSUMER_SECRET = "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";

// passport.use(new GoogleStrategy({
//   consumerKey: GOOGLE_CLIENT_ID,
//     consumerSecret: GOOGLE_CONSUMER_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/google/callback"
// },
// function (token, tokenSecret, profile, done) {
//   return done(null, profile);
// }));

// passport.serializeUser((user, done) => {
//   return done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   return done(null, user);
// });

// export default passport;

// passport.use(
//   new GoogleStrategy(
//     {
//       consumerKey: GOOGLE_CLIENT_ID,
//       consumerSecret: GOOGLE_CONSUMER_SECRET,
//       callbackURL: "http://127.0.0.1:3000/auth/google/callback",
//     },
//     function (token, tokenSecret, profile, cb) {
//       UserGoogle.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return cb(err, user);
//       });
//     }
//   )
// );

const GITHUB_CLIENT_ID = "ec3dcae004ece4f9e547";
const GITHUB_CLIENT_SECRET = "ce5a3c2046688e040c60c9a4a1b92444bef8694b";

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("accessToken",accessToken)
      console.log("refreshToken",refreshToken)
      done(null, profile);
    }
  )
);
export default passport;

