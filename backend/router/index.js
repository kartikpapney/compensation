const express = require('express');
const { controller } = require('../controller/universal');
const Offer = require('../schema/Offer');
const Company = require('../schema/Company');
const Location = require('../schema/Location');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get(
  '/manifest',
  controller(async (req, res) => {
    const [
      {yoe: minYoe},
      {yoe: maxYoe},
      {ctc: minTotalCompensation},
      {ctc: maxTotalCompensation}
    ] = await Promise.all([
      Offer.findOne({}).sort({yoe: 1}).select("yoe").lean(),
      Offer.findOne({}).sort({yoe: -1}).select("yoe").lean(),
      Offer.findOne({}).sort({ctc: 1}).select("ctc").lean(),
      Offer.findOne({}).sort({ctc: -1}).select("ctc").lean(),
    ])

    return {
      minYoe,
      maxYoe: Math.min(maxYoe, 20),
      minTotalCompensation,
      maxTotalCompensation: Math.min(maxTotalCompensation, 200)
    };
  }),
);

router.get(
  '/company',
  controller(async (req, res) => {
    console.log("inside")
    const { name, limit = 1000, skip = 0 } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    const data = await Company.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();
    const total = await Company.find(query).countDocuments();
    return {
      limit,
      skip,
      total,
      data,
    };
  }),
);

router.get(
  '/location',
  controller(async (req, res) => {
    const { name, limit = 1000, skip = 0 } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    const data = await Location.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();
    const total = await Location.find(query).countDocuments();
    return {
      limit,
      skip,
      total,
      data,
    };
  }),
);

router.get(
  '/',
  controller(async (req, res) => {
    const {
      _location,
      _company,
      yoe,
      sortBy = 'createdAt',
      sort = '-1',
      limit = 10,
      skip = 0,
      minCtc,
      minYoe = -1,
      maxYoe = Infinity,
    } = req.query;
    const query = {};

    if (_location?.length > 0) query['_location'] = {$in: _location.split(",").map((e) => new mongoose.Types.ObjectId(e)).filter((e) => e)};
    if (_company?.length > 0) query['_company'] = {$in: _company.split(",").map((e) => new mongoose.Types.ObjectId(e)).filter((e) => e)};
    
    if (minCtc) query['ctc'] = { $gte: minCtc };
    query['yoe'] = {
      $lte: maxYoe,
      $gte: minYoe,
    };

    if (yoe) query['yoe'] = yoe;

    const data = await Offer.find(query)
      .sort({ [sortBy]: parseInt(sort) })
      .populate('_company _location _role')
      .limit(limit)
      .skip(skip)
      .lean();
    const total = await Offer.find(query).countDocuments();

    return {
      limit,
      skip,
      total,
      data,
    };
  }),
);

module.exports = router;
