import { Request, Response} from "express";
import subCategory from "../models/subCategory";
import BaseController from "./baseController";

class SubCategoryController extends BaseController<any>{
    constructor(){
        super(subCategory);
    }
}


export default new SubCategoryController();

