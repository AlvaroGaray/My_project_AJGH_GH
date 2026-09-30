import { PrismaClient } from '../generated/prisma';
import bcrypt from 'bcryptjs';

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

    const hashedPassword = await bcrypt.hash('123456', 10);

    await prisma.user.create({
        data: {
            email: '[email protected]',
            name: 'Ana Gómez',
            password: hashedPassword,
            telephone: '88887777',
            role: 'ADMIN',
            tenantId: tenant1.id,
        },
    });

    await prisma.user.create({
        data: {
            email: '[email protected]',
            name: 'Luis Pérez',
            password: hashedPassword,
            telephone: '88886666',
            role: 'USER',
            tenantId: tenant2.id,
        },
    });

    await prisma.user.create({
        data: {
            email: '[email protected]',
            name: 'María López',
            password: hashedPassword,
            telephone: '88885555',
            role: 'USER',
            tenantId: tenant3.id,
        },
    });

    console.log('Seed completado: 3 tenants y 3 usuarios creados');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => await prisma.$disconnect());