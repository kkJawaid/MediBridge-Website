import prisma from '../config/db.js';

export const sendComplaint = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const { complaint } = req.body;
        const userComplaint = await prisma.complaint.create( { data: {user_id: id, complaint_body: complaint }});
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