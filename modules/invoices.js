
const express = require('express');
const mongoose = require('mongoose');

const InvoiceModel1 = require('../model/InvoiceModel');

 const getInvoicesByUser = async (req, res) => {
    const {searchQuery} = req.query;

    try {
        const invoices = await InvoiceModel1.find({ creator: searchQuery });
        console.log("invoices", invoices)
        res.status(200).json({ data: invoices });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


 const getTotalCount = async (req, res) => {
    const {searchQuery} = req.query;

    try {
        // const invoices = await InvoiceModel1.find({ creator: searchQuery });
        const totalCount = await InvoiceModel1.countDocuments({ creator: searchQuery });

        res.status(200).json(totalCount);
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}


 const getInvoices = async (req, res) => {

    try {
        const allInvoices = await InvoiceModel1.find({}).sort({_id:-1}) 

        res.status(200).json(allInvoices)

    } catch (error) {
        res.status(409).json(error.message)
        
    }
    
}




 const createInvoice = async (req, res) => {

    const invoice = req.body

    const newInvoice = new InvoiceModel1(invoice)

    try {
        await newInvoice.save()
        res.status(201).json(newInvoice)
    } catch (error) {
        res.status(409).json(error.message)
    }

}

 const getInvoice = async (req, res) => { 
    const { id } = req.params;

    try {
        const invoice = await InvoiceModel1.findById(id);
        
        res.status(200).json(invoice);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


 const updateInvoice = async (req, res) => {
    const { id: _id } = req.params
    const invoice = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No invoice with that id')

    const updatedInvoice = await InvoiceModel1.findByIdAndUpdate(_id, {...invoice, _id}, { new: true})

    res.json(updatedInvoice)
}


 const deleteInvoice = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No invoice with that id')

    await InvoiceModel1.findByIdAndRemove(id)

    res.json({message: 'Invoice deleted successfully'})
}

module.exports = {
    getInvoicesByUser,
    getTotalCount,
    getInvoices,
    createInvoice,
    getInvoice,
    updateInvoice,
    deleteInvoice
  };