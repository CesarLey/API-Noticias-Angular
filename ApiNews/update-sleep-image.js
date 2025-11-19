const { New } = require('./models');
const { connectToDatabase } = require('./config.db');

const updateSleepImage = async () => {
    try {
        await connectToDatabase();
        
        // Actualizar imagen de la noticia sobre el sueño (ID 4)
        await New.update(
            { imagen: 'https://images.unsplash.com/photo-1520206183501-b80df61043c2?w=800&h=600&fit=crop' },
            { where: { id: 4 } }
        );
        
        console.log('✅ Imagen de la noticia sobre el sueño actualizada correctamente');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
};

updateSleepImage();
