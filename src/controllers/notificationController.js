import prisma from '../config/db.js';

export const createNotif = async(userId, message) => {
    try {
        const createdNotif = await prisma.notification.create({
            data: {
                user_id: userId,
                n_body: message
            }
        });
        console.log(createdNotif);
    } catch(err) {
        console.error('Error creating notification:', err);
    }
}

export const viewAllNotifs = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const allNotifs = await prisma.notification.findMany({where: {user_id: id}, select: {n_body: true}});
        res.json(allNotifs);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export const deleteNotif = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const notifId = parseInt(req.params.id);
        const allNotifs = await prisma.notification.delete({where: {user_id: id, n_id: notifId}});
        res.json(allNotifs);
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}