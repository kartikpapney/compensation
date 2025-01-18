const { z } = require('zod');

const offerSchema = z.object({
  company: z.string().describe('Name of the company'),
  role: z.string().describe('Role offered'),
  yoe: z
    .number()
    .min(-1, 'Years of experience must be non-negative')
    .describe('Years of experience'),
  base_offer: z
    .number()
    .min(-1, 'Base offer must be non-negative')
    .describe('Base salary offer'),
  total_ctc: z
    .number()
    .min(-1, 'Total CTC must be non-negative')
    .describe('Total cost to company'),
  prev_ctc: z
    .number()
    .min(-1, 'Previous CTC must be non-negative')
    .describe('Previous cost to company'),
  location: z.string().describe('Location of the job'),
  international: z.boolean().describe('Whether the job is international'),
  review: z
    .enum(['negative', 'neutral', 'positive'])
    .describe('Review of the offer'),
});

const offersArraySchema = z.array(offerSchema);

module.exports = {
  offerSchema,
  offersArraySchema,
};
