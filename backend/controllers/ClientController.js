import asyncHandler from 'express-async-handler';

import Client from '../models/client.js';

const getClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({});

  res.json(clients);
});

const getMyClients = asyncHandler(async (req, res) => {
  const clients = await Client.find({ supervisor: req.user._id });

  res.json(clients);
});

const createClient = asyncHandler(async (req, res) => {
  const { fName, lName, email, phone, projectId } = req.body;

  const existedProjectClient = await Client.findOne({ project: projectId });

  if (!existedProjectClient) {
    const client = new Client({
      fName,
      lName,
      email,
      phone,
      project: projectId,
      supervisor: req.user._id,
    });

    const createdClient = await client.save();

    res.status(201).json(createdClient);
  } else {
    res.status(404);
    throw new Error('Client already exist for this project');
  }
});

const updateClient = asyncHandler(async (req, res) => {
  const { fName, lName, email, phone } = req.body;
  const client = await Client.findById(req.params.id);

  if (client) {
    client.fName = fName || client.fName;
    client.lName = lName || client.lName;
    client.email = email || client.email;
    client.phone = phone || client.phone;

    const updatedClient = await client.save();
    res.json(updatedClient);
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

const deleteClient = asyncHandler(async (req, res) => {
  const client = await Client.findById(req.params.id);

  if (client) {
    client.remove();
    res.json({ message: 'Client Removed' });
  } else {
    res.status(404);
    throw new Error('Client not found');
  }
});

export { getClients, getMyClients, createClient, updateClient, deleteClient };
