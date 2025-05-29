import { Request, Response } from "express";
import Voucher from "../models/voucher";
import BaseController from "./baseController";

class VoucherController extends BaseController<any> {
    constructor() {
        super(Voucher);
    }
}
export default new VoucherController();