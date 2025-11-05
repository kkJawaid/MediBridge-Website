import prisma from '../config/db.js';
import bcrypt from 'bcryptjs';

export const editUserName = async (req, res) => {
    try {
        const id = req.user.userId;
        const { newUsername } = req.body;
        const editedName = await prisma.user.update( { where: {user_id: id }, data: { full_name: newUsername} });
        res.json(editedName);
    } catch(err) {
        res.status(500).json( {error: err.message} );
    }

};

export const editEmail = async (req, res) => {
    try {
        const id = req.user.userId;
        const { newEmail } = req.body;
        const editedEmail = await prisma.user.update( {where: {user_id: id}, data: { email: newEmail} });
        res.json(editedEmail);
    } catch(err) {
        res.status(500).json( {error: err.message} );
    }
}

export const editPassword = async (req, res) => {
    try {
        const id = req.user.userId;
        const { oldPassword, newPassword } = req.body;
    
        const user = await prisma.user.findUnique( {where: {user_id: id } } ); //fetching user
        const isMatch = await bcrypt.compare(oldPassword, user.password_hash); //comparing entered and stored passwords
        if (!isMatch) return res.status(401).json({ message: 'Invalid password entered' });

        const newHashed = await bcrypt.hash(newPassword, 10);
        const changedPass = await prisma.user.update( {where: {user_id: id}, data: {password_hash: newHashed} } );
        res.json(changedPass);
    } catch (err) {
        res.status(500).json( {error: err.message} );
    }
}


export const editContact = async(req, res) => {
     try {
        const id = parseInt(req.user.userId);
        const { contact } = req.body;
        const editedContact = await prisma.user.update( {where: {user_id: id}, data: {contact}});
        res.json(editedContact);
    } catch(err) {
        res.status(500).json( { error: err.message });
    }
}

export const editAddress = async(req, res) => {
     try {
        const id = parseInt(req.user.userId);
        const { address } = req.body;
        const editedAddress = await prisma.user.update( {where: {user_id: id}, data: {address}});
        res.json(editedAddress);
    } catch(err) {
        res.status(500).json( { error: err.message });
    }
}