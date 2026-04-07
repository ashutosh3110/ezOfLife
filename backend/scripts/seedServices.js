import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './src/models/Service.js';

dotenv.config();

const services = [
    {
        name: 'Wash & Fold',
        category: 'Laundry',
        basePrice: 60,
        unit: 'kg',
        tier: 'Essential',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb9f?auto=format&fit=crop&q=80&w=400',
        description: 'Everyday clothes washed, dried and neatly folded.'
    },
    {
        name: 'Steam Ironing',
        category: 'Ironing',
        basePrice: 15,
        unit: 'pc',
        tier: 'Essential',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1522066624503-34cd458a8a47?auto=format&fit=crop&q=80&w=400',
        description: 'Crisp, wrinkle-free steam pressing for your formals.'
    },
    {
        name: 'Dry Cleaning',
        category: 'Dry Cleaning',
        basePrice: 120,
        unit: 'pc',
        tier: 'Heritage',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=400',
        description: 'Professional chemical cleaning for delicate fabrics.'
    },
    {
        name: 'Shoe Spa',
        category: 'Premium',
        basePrice: 250,
        unit: 'pair',
        tier: 'Heritage',
        status: 'Active',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
        description: 'Deep cleaning and restoration for your favorite footwear.'
    }
];


const seedDB = async () => {
    try {
        const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezoflife';
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        await Service.deleteMany({});
        await Service.insertMany(services);

        console.log('Database seeded with services!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
