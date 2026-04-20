import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Promotion from '../src/models/Promotion.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezoflife';

async function seedPromos() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const phone = '9988776655';
        const vendor = await User.findOne({ phone });

        if (!vendor) {
            console.error(`❌ Vendor with phone ${phone} not found!`);
            process.exit(1);
        }

        console.log(`👤 Found Vendor: ${vendor.displayName} (${vendor._id})`);

        const now = new Date();
        const nextMonth = new Date(now.setMonth(now.getMonth() + 1));

        const promos = [
            { title: 'First Order Discount', code: 'WELCOME50', discountType: 'Flat', discountValue: 50, minOrderValue: 200, usageLimit: 500, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Heritage Special', code: 'LUXURY10', discountType: 'Percentage', discountValue: 10, minOrderValue: 1000, usageLimit: 100, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Weekend Wash', code: 'WEEKEND20', discountType: 'Flat', discountValue: 20, minOrderValue: 150, usageLimit: 200, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Flash Sale', code: 'FLASH30', discountType: 'Percentage', discountValue: 30, minOrderValue: 500, usageLimit: 50, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Dry Cleaning Bonanza', code: 'DC50', discountType: 'Flat', discountValue: 50, minOrderValue: 600, usageLimit: 300, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Winter Care', code: 'COZY15', discountType: 'Percentage', discountValue: 15, minOrderValue: 800, usageLimit: 150, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Festival Offer', code: ' उत्सव25', discountType: 'Percentage', discountValue: 25, minOrderValue: 400, usageLimit: 1000, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Bulky Load Discount', code: 'HEAVY100', discountType: 'Flat', discountValue: 100, minOrderValue: 1500, usageLimit: 50, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Student Saver', code: 'STUDENT20', discountType: 'Flat', discountValue: 20, minOrderValue: 0, usageLimit: 1000, expiryDate: nextMonth, vendorId: vendor._id },
            { title: 'Subscription Launch', code: 'SUBVIP', discountType: 'Percentage', discountValue: 50, minOrderValue: 2000, usageLimit: 20, expiryDate: nextMonth, vendorId: vendor._id }
        ];

        // Unique codes only
        for (const promo of promos) {
           await Promotion.findOneAndUpdate(
               { code: promo.code }, 
               promo, 
               { upsert: true, new: true }
           );
        }

        console.log(`✅ Successfully seeded/updated 10 promos for ${vendor.displayName}.`);
        await mongoose.disconnect();
        console.log('👋 Disconnected');
    } catch (err) {
        console.error('❌ Seeding Error:', err);
    }
}

seedPromos();
