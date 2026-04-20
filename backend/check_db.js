import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ DB Connected');
        
        const count = await User.countDocuments({ role: 'Customer' });
        console.log('Customer Count:', count);
        
        const vendors = await User.find({ role: 'Vendor' }).limit(1);
        console.log('Vendor 1 found:', !!vendors[0]);
        
        process.exit(0);
    } catch (err) {
        console.error('❌ DB Diagnostic Fail:', err);
        process.exit(1);
    }
}

check();
