// import { Request, Response, NextFunction } from "express";
// import UserGoogle from "../models/userGoogle.model";

// class UserGoogleController {
//   // Đăng nhập người dùng
//   login = async (req: Request, res: Response) => {
//     // Xử lý logic đăng nhập ở đây
//   };

//   // Đăng ký người dùng
//   register = async (req: Request, res: Response) => {
//     // Xử lý logic đăng ký ở đây
//   };

//   // Đăng xuất người dùng
//   logout = async (req: Request, res: Response) => {
//     // Xử lý logic đăng xuất ở đây
//   };

//   // Xác thực người dùng (middleware)
//   authenticate = async (req: Request, res: Response, next: NextFunction) => {
//     console.log(req);
//     // Xử lý logic xác thực ở đây
//     // Đảm bảo người dùng đã đăng nhập và có quyền truy cập
//     // if (req.isAuthenticated()) {
//     //   return next();
//     // } else {
//     //   // Redirect hoặc trả về lỗi
//     // }
//   };
// }

// export default UserGoogleController