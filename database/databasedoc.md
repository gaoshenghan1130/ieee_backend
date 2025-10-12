前端 (login.html)
      ↓  POST /api/login
后端 (Node.js)
      ↓  验证用户名密码（数据库）
      ↓  生成 JWT
      ↓  返回 Set-Cookie: token=JWT; HttpOnly; Secure
浏览器自动保存 Cookie
      ↓  
前端访问 /api/userinfo 等接口时
      ↓  浏览器自动带上 Cookie
      ↓  后端验证 token 是否有效