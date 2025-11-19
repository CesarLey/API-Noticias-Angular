const { New } = require('./models');
const { connectToDatabase } = require('./config.db');

const updateImages = async () => {
    try {
        await connectToDatabase();
        
        await New.update(
            { imagen: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800&h=600&fit=crop' },
            { where: { id: 1 } }
        );
        
        await New.update(
            { imagen: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop' },
            { where: { id: 2 } }
        );
        
        await New.update(
            { imagen: 'https://images.unsplash.com/photo-1551927336-7a5b33bcbe6e?w=800&h=600&fit=crop' },
            { where: { id: 3 } }
        );
        
        await New.update(
            { imagen: 'https://images.unsplash.com/photo-1541480551145-2370a440d585?w=800&h=600&fit=crop' },
            { where: { id: 4 } }
        );
        
        await New.update(
            { imagen: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=600&fit=crop' },
            { where: { id: 5 } }
        );
        
        console.log('✅ Imágenes actualizadas correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateImages();
