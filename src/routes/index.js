import express from "express";
import livrosRoutes from "./livrosRoutes.js";
import autoresRoutes from "./autoresRoutes.js"

const routes = (app) => {
    app.use(express.json(), livrosRoutes);
    app.use(express.json(), autoresRoutes);

};

export default routes;