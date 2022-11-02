import mongoose, { Schema } from 'mongoose';

// An interface that describes the properties
// that a User Document has
interface IValheimUserDoc extends mongoose.Document {
    discordUserId: string;
    deaths: string;
    status: string;
    IGN: string;
    lastLogin: Date;
}

const valheimUserSchema = new Schema(
    {
        IGN: {
            type: String,
        },
        deaths: String,
        status: {
            type: String,
            enum: ['online', 'offline'],
            default: 'online',
        },
        discordUserId: String,
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
        timestamps: true,
    }
);

const ValheimUser = mongoose.model<IValheimUserDoc, mongoose.Model<IValheimUserDoc>>(
    'ValheimUser',
    valheimUserSchema
);

export default ValheimUser;
export type { IValheimUserDoc };
