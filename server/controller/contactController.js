import express from 'express'
import { ContactModel } from '../models/Contact.js'


const createContact = async (req, res) => {

    const { name, email, phone, address } = req.body;

    try {
        const newContact = new ContactModel({
            name,
            email,
            phone,
            address,
            postedBy: req.user._id
        })

        const result = await newContact.save();
        return res.status(201).json({ success: true, ...result._doc });
    } catch (err) {
        return res.status(500).json(err.message);
    }
};

const getContacts =async (req,res) => {
    try {
        const contacts = await ContactModel.find({postedBy: req.user._id})
        return res.status(200).json({success: true, contacts})
        } catch(err) {
        return res.status(500).json({error: err.message})
}
}

const getContact =async (req,res) => {
    const {id}=req.params;
    if(!id) {
        return res.status(401).json({error: "No Id specified"})
    }
    try {
        const contacts = await ContactModel.findOne({_id: id})
        return res.status(200).json({success: true, ...contacts._doc})
        } catch(err) {
        return res.status(500).json({error: err.message})
}
}

const updateContact =async (req,res) => {
    const {id}=req.params;
    if(!id) {
        return res.status(401).json({error: "No Id specified"})
    }
    try {
        const result= await ContactModel.findByIdAndUpdate({_id:id}, {...req.body}, {new: true})
        return res.status(200).json({success: true, ...result._doc})
        } catch(err) {
        return res.status(500).json({error: err.message})
}
}

const deleteContact =async (req,res) => {
    const {id}=req.params;
    if(!id) {
        return res.status(401).json({error: "No Id specified"})
    }
    try {
        const contact = await ContactModel.findOne({_id: id})
        if(!contact){
            return res.status(401).json({error: "No Record Existed"})
        }
        const deleteRecord=await ContactModel.findByIdAndDelete({_id: id})
        const contacts =await ContactModel.find({postedBy: req.user._id})
        return res.status(200).json({success: true, contacts})
        } catch(err) {
        return res.status(500).json({error: err.message})
}
}


export { createContact, getContacts ,getContact, updateContact, deleteContact}