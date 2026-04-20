import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Service from '../src/models/Service.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezoflife';

async function seed() {
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

        const services = [
            // 5 Essential Services
            { name: 'Essential Wash & Fold', category: 'Laundry', basePrice: 49, unit: 'kg', tier: 'Essential', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Standard machine wash and neat folding.' },
            { name: 'Essential Steam Iron', category: 'Ironing', basePrice: 15, unit: 'pc', tier: 'Essential', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Professional steam ironing for daily wear.' },
            { name: 'Essential Dry Clean-Suit', category: 'Dry Cleaning', basePrice: 250, unit: 'pc', tier: 'Essential', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Standard dry cleaning for business suits.' },
            { name: 'Essential Blanket Wash', category: 'Laundry', basePrice: 150, unit: 'pc', tier: 'Essential', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Deep cleaning for single blankets.' },
            { name: 'Essential Shoe Clean', category: 'Laundry', basePrice: 199, unit: 'pair', tier: 'Essential', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Basic surface cleaning for sneakers.' },

            // 5 Heritage Services
            { name: 'Heritage Silk Saree Care', category: 'Premium', basePrice: 450, unit: 'pc', tier: 'Heritage', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Delicate hand care and starching for silk.' },
            { name: 'Heritage Woolen Jacket', category: 'Premium', basePrice: 600, unit: 'pc', tier: 'Heritage', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Organic solvent cleaning for woolens.' },
            { name: 'Heritage Tuxedo Spa', category: 'Premium', basePrice: 800, unit: 'pc', tier: 'Heritage', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Ultra-gentle cleaning and bespoke finishing.' },
            { name: 'Heritage Curtains(Heavy)', category: 'Premium', basePrice: 500, unit: 'panel', tier: 'Heritage', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Premium care for velvet and heavy fabrics.' },
            { name: 'Heritage Bridal Wear', category: 'Premium', basePrice: 1500, unit: 'set', tier: 'Heritage', vendorId: vendor._id, isMaster: false, approvalStatus: 'Pending', description: 'Museum-quality cleaning for heavy embroideries.' }
        ];

        // Clear existing pending services for this vendor to avoid duplicates if re-run
        await Service.deleteMany({ vendorId: vendor._id, approvalStatus: 'Pending' });

        const created = await Service.insertMany(services);
        console.log(`✅ Successfully seeded ${created.length} services (Pending Approval).`);

        await mongoose.disconnect();
        console.log('👋 Disconnected');
    } catch (err) {
        console.error('❌ Seeding Error:', err);
    }
}

seed();
