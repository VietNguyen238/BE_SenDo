import { Request, Response } from "express";
import { Model, Document } from "mongoose";

class BaseController<T extends Document> {
    constructor(private model: Model<T>) {}

    // Get all documents
    getAll = async (req: Request, res: Response): Promise<void> => {
        try {
            const items = await this.model.find();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    // Get document by ID
    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const item = await this.model.findById(req.params.id);
            if (!item) {
                res.status(404).json({ message: "Not found" });
                return;
            }
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    // Create new document
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const newItem = new this.model(req.body);
            const savedItem = await newItem.save();
            res.status(201).json(savedItem);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    // Update document
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const updatedItem = await this.model.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedItem) {
                res.status(404).json({ message: "Not found" });
                return;
            }
            res.status(200).json(updatedItem);
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

    // Delete document
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const deletedItem = await this.model.findByIdAndDelete(req.params.id);
            if (!deletedItem) {
                res.status(404).json({ message: "Not found" });
                return;
            }
            res.status(200).json({ message: "Deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };
}

export default BaseController; 