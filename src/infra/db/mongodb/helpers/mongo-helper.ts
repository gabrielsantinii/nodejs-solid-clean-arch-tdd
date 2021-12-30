import mongoose from "mongoose";

export class MongoHelper {
    private constructor() {}

    static getCollection(name: string): mongoose.Model<any> {
        const mongooseSchema = new mongoose.Schema({}, { strict: false });
        mongooseSchema.set("toJSON", {
            virtuals: true,
            versionKey: false,
            transform: function (doc, ret) {
                delete ret._id;
            },
        });
        if (mongoose.models[name]) return mongoose.models[name];

        const Model = mongoose.model(name, mongooseSchema);
        return Model;
    }
}
