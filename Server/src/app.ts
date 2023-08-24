import express, {Express, Request, Response} from 'express';
import { Database } from './libs/db/mongo.conect';
import morgan from 'morgan';
import bodyParser from 'body-parser'
import cors from 'cors';
import routerUser from './app/routes/user.routes';
import { upload } from './app/middlewares/upload.middleware';
import routerMovie from './app/routes/movie.routes';
import routerFavorite from './app/routes/favorite.routes';
import routerComment from "./app/routes/comments.routes"
import path from 'path';
import cookieParser from 'cookie-parser';
import routerGithub from './app/routes/auth.routes';
import session from "express-session"

// import passportSetUp from './configs/passport';
// import routerUserGoogle from './app/routes/auth.routes'
//Init Database
Database.getInstance();



const app: Express = express();
app.use(cookieParser());

const staticPath = path.join(__dirname, "../public")
app.use(express.static(staticPath))

const corsOrigin = ['https://project-reactjs-nodejs-movie-pmc7.vercel.app', 'http://localhost:3000', 'http://localhost:3030','http://localhost:8000','https://project-reactjs-nodejs-movie-tnyl.vercel.app']
//Middleware

app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use('/auth', routerUserGoogle);
// app.use(session({
//   secret: '1c3c5c1e419eb2aeed32a3c189af0f1f2aa71104', // Đặt một chuỗi bí mật để mã hóa phiên
//   resave: false,
//   saveUninitialized: true
// }));
app.use(session({
  secret: '4a168161eb17443fb2ddc0e46c47b06ac17d2aef',
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', routerGithub);


const corsOptions = {
  origin: corsOrigin,
  credentials: true, //access-control-allow-credentials:true
  optionsSuccessStatus: 200, // Sửa tên thuộc tính thành optionsSuccessStatus
};

app.use(cors(corsOptions));
//Router
app.use('/api/v1/users', routerUser)
app.use('/api/v1/movie',routerMovie)
app.use('/api/v1/favorite', routerFavorite)
app.use('/api/v1/comments', routerComment)

//Handle Error


//Test Router
app.get("/", (req: Request, res: Response ) => {
  console.log("req", req)

  res.status(200).json({
    message: 'Success'
  })

})


export default app;