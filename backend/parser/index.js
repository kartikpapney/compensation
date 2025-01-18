const { ChatOpenAI } = require('@langchain/openai');

const { PromptTemplate } = require('@langchain/core/prompts');
const { JsonOutputParser } = require('@langchain/core/output_parsers');
const {
  offersArraySchema,
  offerSchema,
} = require('../validator/offer.validator');
const { OPENAI_MODEL, OPENAI_API_KEY, PARSE_TOP } = require('../config');
const { parsePostPrompt } = require('../prompt');
const Post = require('../schema/Post');
const Skip = require('../schema/Skip');
const Offer = require('../schema/Offer');
const Company = require('../schema/Company');
const Location = require('../schema/Location');
const Role = require('../schema/Role');

module.exports = {
  leetcodeParser: async function () {
    try {
      const model = new ChatOpenAI({
        temperature: 0,
        modelName: OPENAI_MODEL,
        openAIApiKey: OPENAI_API_KEY,
      });

      const promptTemplate = new PromptTemplate({
        template: parsePostPrompt(),
        inputVariables: ['post', 'comments'],
      });

      const jsonParser = new JsonOutputParser();
      const jsonChain = promptTemplate.pipe(model).pipe(jsonParser);

      const posts = await Post.find({})
        .sort({ post_id: -1 })
        .select('post comments post_id createdAt')
        .limit(100)
        .lean();
      const { _id: _role } = await Role.findOne({ name: 'default' })
        .select('_id')
        .lean();
      for (const { _id: _post, post, post_id, comments, createdAt } of posts) {
        console.log(`${post_id}: parsing started`);
        try {
          if (await Skip.findOne({ post_id }).lean()) {
            console.log(`${post_id}: exists in skip collection`);
          } else if (await Offer.findOne({ _post }).lean()) {
            console.log(`${post_id}: is already parsed`);
          } else {
            await Offer.deleteMany({ _post });
            const response = await jsonChain.invoke({ post, comments });
            try {
              const validatedData = offersArraySchema.parse(response);
            } catch (e) {
              await Skip.findOneAndUpdate(
                { post_id },
                { post_id },
                { upsert: true },
              );
              throw Error(`${post_id}: can't validate with offers schema`);
            }
            for (const offerData of response) {
              const {
                company,
                role,
                yoe,
                base_offer,
                total_ctc,
                prev_ctc,
                location,
                international,
                review,
              } = offerData;
              if (company) {
                const [{ _id: _company }, { _id: _location }] =
                  await Promise.all([
                    Company.findOneAndUpdate(
                      { name: company },
                      { name: company },
                      { upsert: true, new: true },
                    )
                      .select('_id')
                      .lean(),
                    Location.findOneAndUpdate(
                      { name: location },
                      { name: location },
                      { upsert: true, new: true },
                    )
                      .select('_id')
                      .lean(),
                  ]);
                const offer = new Offer({
                  _company,
                  _location,
                  _role,
                  _post,
                  base: base_offer,
                  ctc: total_ctc,
                  offeredRole: role,
                  prevCtc: prev_ctc,
                  yoe,
                  review,
                  link: `https://leetcode.com/discuss/compensation/${post_id}`,
                  international,
                  createdAt,
                });
                await offer.save();
              } else {
                await Skip.findOneAndUpdate(
                  { post_id },
                  { post_id },
                  { upsert: true },
                );
                throw Error(`${post_id}: doesn't have a valid company name`);
              }
            }
            console.log(`${post_id}: parsed and saved successfully`);
          }
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  },
};
