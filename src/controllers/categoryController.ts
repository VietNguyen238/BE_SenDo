import { Request, Response} from "express";
import Category from "../models/category";
import BaseController from "./baseController";

class CategoryController extends BaseController<any>{
    constructor(){
        super(Category);
    }
}


export default new CategoryController();

