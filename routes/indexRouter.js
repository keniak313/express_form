import { Router } from "express";

export const indexRouter = Router();

const content = "main";

indexRouter.get("/", (req,res)=>{
    res.render("index",{content: content})
})