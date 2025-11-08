import prisma from '../config/db.js';
import { createNotif } from './notificationController.js';

export const sendComplaint = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const { complaint } = req.body;
        const userComplaint = await prisma.complaint.create( { data: {user_id: id, complaint_body: complaint }});
        await createNotif(id, 'Your complaint has been submitted.');
        res.json(userComplaint);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

export const viewAllComplaints = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const viewedComplaints = await prisma.complaint.findMany( { where: {user_id: id}});
        res.json(viewedComplaints);
    } catch(err) {
        res.status(500).json( { error: err.message });
    }
}


export const viewComplaint = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const complaintId = parseInt(req.params.id);
        const returnedComplaint = await prisma.complaint.findUnique({ where: {user_id: id, complaint_id: complaintId}, select: {complaint_body: true}});
        res.json(returnedComplaint);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

export const resolveComplaint = async(req, res) => {
    try {
        const complaintId = parseInt(req.params.id);
        const { response } = req.body;
        const resolved = await prisma.complaint.update({ where: {complaint_id: complaintId}, data: { response, status: 'response_sent' }});
        //finding user id:
        const id = await prisma.complaint.findFirst({where: {complaint_id: complaintId}, select: {user_id: true}});
        await createNotif(id.user_id, `A response has been sent for your complaint with id ${complaintId}`);
        res.json(resolved);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

/* 
router.post('/send', protect, sendComplaint);
router.get('/viewAll', protect, viewAllComplaints);
router.get('/view', protect, viewComplaint);
router.put('/resolve', adminOnly, resolveComplaint);
*/