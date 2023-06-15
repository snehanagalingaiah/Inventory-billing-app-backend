const express = require('express');
const mongoose = require('mongoose');
const productModel = require('../model/product');

const { ClientModel } = require('../model/ClientModel.js');
const ClientModel1 = require('../model/ClientModel');


//  const getClients = async (req, res) => {
//     const userId = req.body

//     try {
//         const allClients = await ClientModel.find({userId: userId}).sort({_id:-1}) 
//         //find({}).sort({_id:-1}) to sort according to date of creation

//         res.status(200).json(allClients)

//     } catch (error) {
//         res.status(409).json(error.message)
        
//     }
    
// }


 const getClient = async (req, res) => { 
    const { id } = req.params;

    try {
        const client = await ClientModel1.findById(id);
        
        res.status(200).json(client);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


 const getClients = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await ClientModel1.countDocuments({});
        const clients = await ClientModel1.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: clients, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

 const createClient = async (req, res) => {

    const ClientData = new ClientModel1({...req.body});
    try {
        const createdResponse = await ClientData.save();
        res.send(createdResponse)
    } catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
}

 const updateClient = async (req, res) => {
    const { id: _id } = req.params
    const client = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No client with that id')

    const updatedClient = await ClientModel1.findByIdAndUpdate(_id, {...client, _id}, { new: true})

    res.json(updatedClient)
}


 const deleteClient = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Client with that id')

    await ClientModel1.findByIdAndRemove(id)

    res.json({message: 'Client deleted successfully'})
}


 const getClientsByUser = async (req, res) => {
    const { searchQuery } = req.query;


    try {
        const clients = await ClientModel1.find({ userId: searchQuery });
        console.log("clients", clients)

        // res.send(products)
        res.json({ data: clients });
    }catch(err) {
        console.error(err);
        res.status(500).send(err);
    }
    
}

module.exports = {
    getClient,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    getClientsByUser
  };