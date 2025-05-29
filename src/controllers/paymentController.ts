import { Request, Response } from "express";
import qs from "querystring";
import crypto from "crypto";
import moment from "moment";

interface VNPayParams {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: string;
  vnp_CreateDate: string;
  vnp_BankCode?: string;
  vnp_SecureHash?: string;
}

function sortObject(obj: Record<string, any>): Record<string, any> {
  const sorted: Record<string, any> = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

const tmnCode = process.env.VNPAY_TMN_CODE;
const secretKey = process.env.VNPAY_SECRET_KEY;
const returnUrl = process.env.VNPAY_RETURN_URL;
const vnp_Url = process.env.VNPAY_URL;

const paymentController = {
  addPayment: (req: Request, res: Response) => {
    try {
      const amount = Number(req.query.amount);
      if (isNaN(amount)) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      const ipAddr = req.ip;
      const orderId = moment().format("YYYYMMDDHHmmss");
      const bankCode =
        typeof req.query.bankCode === "string" ? req.query.bankCode : "NCB";
      const createDate = moment().format("YYYYMMDDHHmmss");
      const orderInfo = "Thanh_toan_don_hang";
      const locale =
        typeof req.query.language === "string" ? req.query.language : "vn";
      const currCode = "VND";

      const vnp_Params: VNPayParams = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: tmnCode as string,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: orderInfo,
        vnp_OrderType: "billpayment",
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl as string,
        vnp_IpAddr: ipAddr || "",
        vnp_CreateDate: createDate,
      };

      if (bankCode !== "") {
        vnp_Params.vnp_BankCode = bankCode;
      }

      const sortedParams = sortObject(vnp_Params);
      const signData = qs.stringify(sortedParams);
      const hmac = crypto.createHmac("sha512", secretKey as string);
      const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
      sortedParams.vnp_SecureHash = signed;

      const paymentUrl = vnp_Url + "?" + qs.stringify(sortedParams);
      res.json({ paymentUrl });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },

  getPayment: async (req: Request, res: Response) => {
    try {
      const query = req.query as Record<string, string>;
      const vnp_SecureHash = query.vnp_SecureHash;

      if (!vnp_SecureHash) {
        return res.status(400).json({ message: "Missing secure hash" });
      }

      delete query.vnp_SecureHash;
      const signData = qs.stringify(query);
      const hmac = crypto.createHmac("sha512", secretKey as string);
      const checkSum = hmac.update(signData).digest("hex");

      if (vnp_SecureHash === checkSum) {
        if (query.vnp_ResponseCode === "00") {
          res.json({ message: "Thanh toán thành công", data: query });
        } else {
          res.json({ message: "Thanh toán thất bại", data: query });
        }
      } else {
        res.status(400).json({ message: "Dữ liệu không hợp lệ" });
      }
    } catch (error) {
      res.status(500).json({ message: error });
    }
  },
};

export default paymentController;
