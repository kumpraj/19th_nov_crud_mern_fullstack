const express = require('express');
const User = require('../models/userModels');

exports.home = (req, res) => {
    res.send("Hello Aplha");
}

exports.createUser = async (req, res) => {
    try {
        const {name, email} = req.body;
        
        //  to check all details
        if(!name || !email){
            throw new Error("Name and Email are required");
        }

        //  to check if user exists
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error("Email already exists");
        }

        // Insert user into DB
        const user = await User.create({name, email});
        // send response
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.log(error);
    }
};

exports.getUsers = async (req,res) => {
    try {
        const users = await User.find();
        res.status(201).json({
            success: true,
            users
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

exports.editUser = async (req,res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

exports.deleteUser = async (req,res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
}