const mongoose = require('mongoose');
const { Schema } = mongoose;

const OfferSchema = new Schema({
  _company: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Company',
    index: true,
  },
  _location: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Location',
    index: true,
  },
  _role: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Role',
    index: true,
  },
  _post: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'Post',
    index: true,
  },
  offeredRole: { type: Schema.Types.String, default: '' },
  yoe: { type: Schema.Types.Double, default: -1 },
  base: { type: Schema.Types.Double, default: -1 },
  ctc: { type: Schema.Types.Double, default: -1 },
  prevCtc: { type: Schema.Types.Double, default: -1 },
  review: {
    type: Schema.Types.String,
    enum: ['negative', 'neutral', 'positive'],
    default: 'neutral',
  },
  link: {
    type: Schema.Types.String,
    default: '',
  },
  international: { type: Schema.Types.Boolean, default: false },
  createdAt: { type: Number },
});

const Offer = mongoose.model('Offer', OfferSchema);

module.exports = Offer;
