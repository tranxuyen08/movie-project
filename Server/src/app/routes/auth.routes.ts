import express, { Request, Response } from "express";
import passport from "../../configs/passport";
import axios from "axios";
import session from "express-session";
import { get } from "lodash";
import querystring from "querystring";

const routerGithub = express.Router();
declare module "express-session" {
  interface SessionData {
    accessToken: string;
    // Các thuộc tính khác mà bạn cần lưu trong session
  }
}

// routerGithub.get(
//   "/github",
//   passport.authenticate("github", { scope: ["email:email"] })
// );
// routerGithub.use(
//   session({
//     secret: 'ce5a3c2046688e040c60c9a4a1b92444bef8694b',
//     resave: false,
//     saveUninitialized: true,
//   })
// );
// let access_token = ""
// routerGithub.get('/github/callback', (req: Request, res: Response) => {
//   const authorizationCode = req.query.code;
//   access_token = req.rawHeaders[3].split(" ")[1]
//   axios
//     .post(`https://github.com/login/oauth/access_token=${access_token}`, {
//       client_id: 'ec3dcae004ece4f9e547',
//       client_secret: 'ce5a3c2046688e040c60c9a4a1b92444bef8694b',
//       code: authorizationCode,
//     })
//     .then((_response) => {
//       // const accessToken = response.data.access_token;
//       // console.log("accessToken", response)
//       // Lưu accessToken vào session
//       req.session.accessToken = access_token; // Đảm bảo bạn đã thêm accessToken vào session ở đây
//       res.redirect('/auth/success');
//     });
// });
// routerGithub.get("/success", (req, res) => {
//   const accessToken = req.session.accessToken;
//   console.log(11111212,accessToken)
//   axios({
//     method: 'get',
//     url: 'https://api.github.com/user',
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   }).then((response) => {
//     // Xử lý dữ liệu người dùng từ response.data
//     return res.status(200).json(response.data);
//   });
// });
const GITHUB_CLIENT_ID = "ec3dcae004ece4f9e547";
const GITHUB_CLIENT_SECRET = "4a168161eb17443fb2ddc0e46c47b06ac17d2aef";

async function getGitHubUser(code: string) {
  try {
    const githubToken = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code,
        },
        headers: {
          accept: "application/json",
        },
      }
    );
    const accessToken = githubToken.data.access_token;
    console.log("first", accessToken);
    const gitHubUser = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return gitHubUser.data;
  } catch (error) {
    console.error("Error getting user from GitHub", error);
    throw error;
  }
}

routerGithub.get("/github", async (req: Request, res: Response) => {
  const code = req.query.code as string;
  console.log("code",code)
  const path = req.query.path as string;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  try {
    const response = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code: code,
        },
        headers: {
          accept: "application/json",
        },
      }
    );
    console.log("response123",response)

    const accessToken = response.data.access_token;
    console.log("response1235",accessToken)

    // Lưu accessToken vào session
    req.session.accessToken = accessToken;
    //   const githubUser = await getGitHubUser(code)
    // // Đảm bảo bạn đã thêm accessToken vào session ở đây
    // console.log("111",githubUser)
    res.redirect("/auth/success");
    return
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "An error occurred" });
  }
});
routerGithub.get("/success", (req: Request, res: Response) => {
  // Kiểm tra xem có access token trong session không
  const accessToken = req.session.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Access token not found" });
  }

  // Sử dụng access token để gọi API từ GitHub hoặc xử lý dữ liệu người dùng
  axios
    .get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      // Xử lý dữ liệu người dùng từ response.data
      return res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error("Error getting user from GitHub", error);
      return res.status(500).json({ error: "An error occurred" });
    });
    return
});

export default routerGithub;
