const authRouter = require("./app/routes/auth.route");
const librarianRoutes = require("./app/routes/librarian.route");
const memberRoutes = require("./app/routes/member.route");

function setupRoutes(app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/librarian", librarianRoutes);
  app.use("/api/v1/member", memberRoutes);
}

module.exports = setupRoutes;
