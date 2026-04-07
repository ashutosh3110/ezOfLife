import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezoflife';
const PHONE_NUMBER = '6263510061';

async function seedAdmin() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const result = await User.findOneAndUpdate(
            { phone: PHONE_NUMBER },
            { phone: PHONE_NUMBER, role: 'Admin', displayName: 'System Admin' },
            { upsert: true, new: true }
        );

        console.log('🚀 Admin seeded successfully:');
        console.log(JSON.stringify(result, null, 2));

        await mongoose.connection.close();
        process.exit(0);
    } catch (err) {
        console.error('❌ Error seeding admin:', err);
        process.exit(1);
    }
}

seedAdmin();
