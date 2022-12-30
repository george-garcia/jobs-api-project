const Job = require('../models/Job');

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(200).json({jobs, count: jobs.length});
}

const getJob = async (req, res) => {
    // console.log(req.params);
    const {id: requestedJobId} = req.params;
    const { userId } = req.user;

    const job = await Job.findOne({_id: requestedJobId, createdBy: userId});
    if(!job)
        throw new Error('Job could not be found');
    res.status(201).json({job});
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    // console.log(req.body);
    const job = await Job.create(req.body);
    res.status(201).json({job});
}
const updateJob = async (req, res) => {
    const {id: requestedJobId} = req.params;
    const { userId } = req.user;

    const job = await Job.updateOne({_id: requestedJobId, createdBy: userId}, req.body, {new: true});
    if(!job)
        throw new Error('Job could not be found');

    const updatedJob = await Job.findOne({_id: requestedJobId, createdBy: userId});
    res.status(201).json({updatedJob});
}

const deleteJob = async (req, res) => {
    const {id: requestedJobId} = req.params;
    const { userId } = req.user;

    const job = await Job.findByIdAndRemove({ _id: requestedJobId, createdBy: userId});
    if(!job)
        throw new Error('Job could not be found');

    res.status(201).send();
}

module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}