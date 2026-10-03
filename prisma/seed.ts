import { PrismaClient } from '../generated/prisma/client.js';


const prisma = new PrismaClient();

async function main() {
    const tenant1 = await prisma.tenant.create({
        data: { name: 'Empresa Norte' },
    });
    const tenant2 = await prisma.tenant.create({
        data: { name: 'Empresa Sur' },
    });
    const tenant3 = await prisma.tenant.create({
        data: { name: 'Empresa Centro' },
    });

    await prisma.user.create({
        data: {
            email: 'garay@gmail.com',
            name: 'Alvaro Garay',
            password: 'password123',
            telephone: '88887777',
            role: 'ADMIN',
            tenantId: tenant1.id,
        },
    });

    await prisma.user.create({
        data: {
            email: 'palma@gmail.com',
            name: 'Luis Pérez',
            password: 'password123',
            telephone: '88886666',
            role: 'USER',
            tenantId: tenant2.id,
        },
    });

    await prisma.user.create({
        data: {
            email: 'asensio@gmail.com',
            name: 'María López',
            password: 'password123',
            telephone: '88885555',
            role: 'USER',
            tenantId: tenant3.id,
        },
    });

    console.log('Seed completado: 3 tenants y 3 usuarios creados (sin hash)');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());